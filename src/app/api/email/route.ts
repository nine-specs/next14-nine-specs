import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "이메일을 입력하세요." },
        { status: 400 },
      );
    }

    const result = await sendEmail({
      to: email,
      subject: "메일 인증을 해주세요",
      message: "메일 발송에 성공했습니다.",
    });

    return NextResponse.json({ accepted: result.accepted }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { message: "메일 발송에 실패했습니다." },
      { status: 500 },
    );
  }
}
