import { firestore } from "@/firebase/firebaseConfig";
import dayjs from "dayjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

const COLLECTION_NAME = "reportGptResponse";
const parsedMessage = (json: string) => {
  const jsonStart = json.indexOf("{");
  const jsonEnd = json.lastIndexOf("}") + 1;
  const jsonString = json.substring(jsonStart, jsonEnd);
  const data = JSON.parse(jsonString);
  return data;
};
export async function POST(request: Request) {
  try {
    const reportData = await request.json();
    const { system, message, code } = reportData; // 시스템, 메시지, 종목 코드
    const today = dayjs().format("YYYY-MM-DD"); // 현재 날짜

    const stockRef = doc(firestore, COLLECTION_NAME, `${today}_${code}`); // 현재 날짜와 종목 코드로 문서 참조 생성

    const docSnap = await getDoc(stockRef); // 문서 조회

    if (!docSnap.exists()) {
      const fetchGpt = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gpt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system,
          message,
        }),
        cache: "no-store",
      });
      const responseGptMessage = await fetchGpt.json();
      const messageJson = parsedMessage(responseGptMessage); // gpt 응답 데이터 텍스트 분류
      await setDoc(stockRef, messageJson); // 데이터 저장

      const updatedDocSnap = await getDoc(stockRef); // 문서 다시 조회
      return NextResponse.json(updatedDocSnap.data(), { status: 200 });
    }

    // 문서가 존재하는 경우 기존 데이터를 반환
    return NextResponse.json(docSnap.data(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "gpt 통신 실패" }, { status: 500 });
  }
}
