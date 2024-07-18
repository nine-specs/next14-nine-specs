import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSession";

// 인증이 필요한 경로
const protectedPaths = [
  // "/discovery",
  // "/favorite",
  // "/home",
  // "/mypage",
  "/news",
  "/report",
];

// 로그인 유저가 접근할 수 없는 경로
const restrictedPaths = [
  "/accountDeletion",
  // "/login",
  // "/signLink",
  // "/profiletest",
  // "/agree",
  // "/sign",
  // "/socialSign",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();

  // 로그인 상태가 아니면 인증이 필요한 페이지로 이동 시 /login 페이지로 리다이렉트
  if (!session && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인 상태이면 루트 경로로 이동 시 /home 페이지로 리다이렉트
  // 또는 로그인 유저가 접근할 수 없는 페이지로 이동 시 /home 페이지로 리다이렉트
  if (
    (session && pathname === "/") ||
    (session && restrictedPaths.some((path) => pathname.startsWith(path)))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 다른 요청들은 그대로
  return NextResponse.next();
}
export const config = {
  matcher: "/((?!api).*)",
};
