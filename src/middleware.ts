import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSeesion";

// 인증이 필요한 페이지 목록
const protectedPaths = [
  "/discovery",
  "/favorite",
  "/home",
  "/mypage",
  "/news",
  "/report",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();

  // 로그인 상태가 아니면 인증이 필요한 페이지로 이동 시 /login 페이지로 리다이렉트
  if (!session && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인 상태이면 루트 경로로 이동 시 /home 페이지로 리다이렉트
  if (session && pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 다른 요청들은 그대로
  return NextResponse.next();
}
export const config = {
  matcher: "/((?!api).*)",
};
