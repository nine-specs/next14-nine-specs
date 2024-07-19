import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getEmailFromToken } from "@/lib/tokenService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    //console.log("토큰 가져오기: ", token);

    if (!token) {
      return NextResponse.json({ message: "토큰이 제공되지 않았습니다." }, { status: 400 });
    }

    const isValid = verifyToken(token);

    if (!isValid) {
      return NextResponse.json({ message: "유효하지 않은 토큰입니다." }, { status: 400 });
    }

    const email = getEmailFromToken(token);

    if (!email) {
      return NextResponse.json({ message: "토큰에서 이메일을 추출할 수 없습니다." }, { status: 400 });
    }

    return NextResponse.json({ status: 200, email }, { status: 200 });
  } catch (error) {
    console.error("토큰 검증 에러:", error);
    return NextResponse.json({ message: "토큰 검증에 실패했습니다." }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
