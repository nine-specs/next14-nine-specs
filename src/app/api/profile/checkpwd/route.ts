import { GetUser } from "@/hooks/profile/useGetUser";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  try {
    const user = await GetUser(); // 유저 데이터 가져오기  ->현재 김두한
    // 현재 비밀번호 확인
    if (user) {
      const isPasswordMatch = await compare(password, user?.password);
      if (!isPasswordMatch) {
        return NextResponse.json({ message: isPasswordMatch }, { status: 500 }); // 불일치 false 전달.
      } else {
        return NextResponse.json({ message: isPasswordMatch }, { status: 200 }); // 일치시 true
      }
    }
  } catch (error) {
    console.error("주식 데이터를 추가하는 중 에러 발생:", error);
    return NextResponse.json({ message: "관심종목 추가에 실패했습니다." }, { status: 500 });
  }
}
