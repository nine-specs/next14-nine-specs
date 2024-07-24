import type { NextAuthConfig } from "next-auth";
import * as jose from "jose";
import { firestore } from "./firebase/firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY as string;

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUsers = nextUrl.pathname.startsWith("/");

      if (isOnUsers) {
        if (isLoggedIn) return true;
        console.log("[authorized callback] 인증되지 않은 사용자를 로그인 페이지로 리디렉션합니다");
        return "/login"; // 인증되지 않은 사용자는 로그인 페이지로 리디렉션
      } else if (isLoggedIn) {
        console.log("[authorized callback] 인증된 사용자를 리디렉션합니다", new URL("/", nextUrl));
        return "/home"; // 인증된 사용자는 홈 페이지로 리디렉션
      }

      return true;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === "Kakao" || account?.provider === "google" || account?.provider === "naver") {
        const { id, name, email, birthdate, image } = user;
        console.log(`[signIn callback] ${account.provider.toUpperCase()} 사용자 정보:`, user);

        const userDocRef = collection(firestore, "users");
        console.log("[signIn callback] Firestore의 users 컬렉션에 접근합니다.");

        const q = query(userDocRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("[signIn callback] 새로운 사용자를 /socialSign으로 리디렉션합니다");
          // JWT 토큰 생성
          const token = jwt.sign({ id, name, email, birthdate, image, provider: account.provider }, secret, {
            expiresIn: "30m",
          });
          console.log("=================", token);

          // 리디렉션 경로에 JWT 토큰 추가
          return `/api/cookie?token=${token}`;
        }

        const userDoc = querySnapshot.docs[0];
        console.log("[signIn callback] Firestore에 사용자 문서가 이미 존재합니다:", userDoc.data());

        // 이미 존재하는 사용자의 경우 데이터베이스에서 가져온 정보를 사용자 객체에 설정
        user.id = userDoc.id;
      }

      if (user.id) {
        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const alg = "HS256";

        const accessToken = await new jose.SignJWT({})
          .setProtectedHeader({ alg })
          .setExpirationTime("72h")
          .setSubject(user.id.toString())
          .sign(secret);

        const refreshToken = await new jose.SignJWT({})
          .setProtectedHeader({ alg })
          .setExpirationTime("30d")
          .setSubject(user.id.toString())
          .sign(secret);

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
      }

      console.log("[signIn callback] JWT 토큰 생성 후 사용자 정보:", user);

      return true;
    },

    async jwt({ token, user }: { token: any; user: any }) {
      console.log("[jwt callback] JWT 토큰 생성 - 사용자 정보:", user);
      if (user) {
        token.id = user.id;
        token.nickname = user.nickname;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      console.log("[jwt callback] 생성된 JWT 토큰:", token);
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      console.log("[session callback] 호출됨");
      console.log("[session callback] 세션 생성 - JWT 토큰:", token);
      if (token?.id) {
        session.user.id = token.id;
        session.user.nickname = token.nickname;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }
      console.log("[session callback] 생성된 세션:", session);
      return session;
    },
  },
  providers: [],
} as NextAuthConfig;
