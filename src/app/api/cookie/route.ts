import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const secret = process.env.SECRET_KEY as string; // 환경 변수에서 시크릿 키 가져오기

    jwt.verify(token, secret);
    console.log("token:====",token)
    console.log("secret:====",secret)

    const response = NextResponse.redirect(
      new URL(`/socialSign?token=${token}`, request.nextUrl.origin),
    );
    response.cookies.set("auth-token", token, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 30, // 30분
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Failed to verify token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
