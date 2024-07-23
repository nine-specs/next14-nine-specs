import { firestore } from "@/firebase/firebaseConfig";
import dayjs from "dayjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const reportData = await request.json();
    const { system, message, code } = reportData;
    const CollectionName = "reportGptResponse";
    const today = dayjs().format("YYYY-MM-DD");

    const stockRef = doc(firestore, CollectionName, `${today}_${code}`); // 문서 참조 생성
    const docSnap = await getDoc(stockRef); // 문서 조회
    if (!docSnap.exists()) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gpt`, {
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

      const responseMessage = await res.json(); // 응답 데이타가 ```json ``` 하고 시작하는 문자열이라서 json으로 변환하기 위해 문자열로 받아옴
      const jsonStart = responseMessage.indexOf("{");
      const jsonEnd = responseMessage.lastIndexOf("}") + 1;
      const jsonString = responseMessage.substring(jsonStart, jsonEnd);
      const data = JSON.parse(jsonString);

      await setDoc(stockRef, data); // 데이터 저장

      const updatedDocSnap = await getDoc(stockRef); // 문서 다시 조회

      return NextResponse.json(updatedDocSnap.data(), { status: 200 });
    }

    // 문서가 존재하는 경우 기존 데이터를 반환
    return NextResponse.json(docSnap.data(), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Failed to process the request." }, { status: 500 });
  }
}
