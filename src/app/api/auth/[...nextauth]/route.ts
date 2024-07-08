import { handlers } from "@/auth";
// import { type NextRequest, NextResponse } from "next/server";
export const { GET, POST } = handlers;

// import kakao from "next-auth/providers/kakao";
// import naver from "next-auth/providers/naver";

// const options = {
//   providers: [
//     kakao({
//       clientId: process.env.KAKAO_CLIENT_ID,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET,
//     }),
//     naver({
//       clientId: process.env.NAVER_CLIENT_ID,
//       clientSecret: process.env.NAVER_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: any; user: any }) {
//       if (user) {
//         token.role = user.role; // JWT 토큰에 사용자 권한 추가
//         token.id = user.id; // JWT 토큰에 사용자 ID 추가
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       if (token?.role) {
//         session.user.role = token.role;
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login", // 로그인 페이지 경로
//   },
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// import { compare } from "bcrypt";
// import NextAuth, { CredentialsSignin } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import kakao from "next-auth/providers/kakao";
// import naver from "next-auth/providers/naver";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     kakao({
//       clientId: process.env.KAKAO_CLIENT_ID,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET,
//     }),
//     naver({
//       clientId: process.env.NAVER_CLIENT_ID,
//       clientSecret: process.env.NAVER_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: any; user: any }) {
//       console.log("jwt", token, user);
//       if (user) {
//         token.role = user.role; // JWT 토큰에 사용자 권한 추가
//         token.id = user.id; // JWT 토큰에 사용자 ID 추가
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       if (token?.role) {
//         session.user.role = token.role;
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login", //소셜로그인 버튼이있는 페이지 경로 설정
//   },
// });

// import NextAuth from "next-auth";
// import KakaoProvider from "next-auth/providers/kakao";

// export const authOptions = {
//   providers: [
//     KakaoProvider({
//       clientId: process.env.KAKAO_CLIENT_ID!,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: "jwt" as const,
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: any; user: any }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login", // 로그인 페이지 경로 설정
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
