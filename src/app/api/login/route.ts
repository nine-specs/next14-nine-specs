import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firestore } from "@/firebase/firebaseConfig"; // Firebase 설정 가져오기
import { auth } from "@/auth";

// POST 요청 처리 - 로그인
export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();

    // userId로 이메일 조회
    const userDoc = await getDoc(doc(firestore, "users", userId));
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "유효하지 않은 사용자 ID입니다." },
        { status: 400 },
      );
    }

    const email = userDoc.data().email;

    // 이메일로 로그인 시도
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    return NextResponse.json(
      { error: "로그인 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
