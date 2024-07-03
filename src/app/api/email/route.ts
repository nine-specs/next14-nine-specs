import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";
import { registeredPw } from "@/hooks/search/useSearchPw";

export async function POST(request: NextRequest) {
  try {
    const { email, type, name, userId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "이메일을 입력하세요." },
        { status: 400 },
      );
    }

    if (type === "passwordReset") {
      // 임시 비밀번호 발급
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userId", userId);
      formData.append("email", email);

      const result = await registeredPw(formData);

      if (result.success) {
        return NextResponse.json({ message: result.message }, { status: 200 });
      } else {
        return NextResponse.json({ message: result.message }, { status: 500 });
      }
    } else {
      // 일반 메일 발송
      const result = await sendEmail({
        to: email,
        subject: "메일 인증을 해주세요",
        message: "메일 발송에 성공했습니다.",
      });

      return NextResponse.json({ accepted: result.accepted }, { status: 200 });
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { message: "메일 발송에 실패했습니다." },
      { status: 500 },
    );
  }
}
