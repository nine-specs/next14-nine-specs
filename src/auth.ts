// import KakaoProvider from "next-auth/providers/kakao";
// import GoogleProvider from "next-auth/providers/google";
// import NaverProvider from "next-auth/providers/naver";
// import jwt from "jsonwebtoken";
// import NextAuth, { CredentialsSignin } from "next-auth";
// import credentials from "next-auth/providers/credentials";
// import { firestore } from "@/firebase/firebaseConfig"; // Firebase 설정 가져오기
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// export const { handlers, signIn, signOut } = NextAuth({
//   providers: [
//     credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };
//         if (!email || !password) {
//           throw new CredentialsSignin("입력값이 부족합니다.");
//         }
//         console.log(email, password, "----login input 값");

//         // 이메일 찾기
//         const userDoc = await getDoc(doc(firestore, "users", email));
//         if (!userDoc.exists()) {
//           throw new CredentialsSignin("사용자를 찾을 수 없습니다.");
//         }

//         const userData = userDoc.data();
//         if (!userData) {
//           throw new CredentialsSignin("사용자를 찾을 수 없습니다.");
//         }

//         // 이메일로 로그인 시도
//         try {
//           const userCredential = await signInWithEmailAndPassword(
//             auth,
//             email,
//             password,
//           );
//           const user = userCredential.user;
//           // 유효한 사용자라면
//           return {
//             id: user.uid,
//             name: user.displayName,
//             email: user.email,
//             accessToken: await user.getIdToken(),
//           };
//         } catch (error) {
//           console.error("Firebase 인증 오류:", error);
//           throw new CredentialsSignin("로그인에 실패했습니다.");
//         }
//       },
//     }),
//     KakaoProvider({
//       clientId: process.env.KAKAO_CLIENT_ID as string,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
//     }),
//     NaverProvider({
//       clientId: process.env.NAVER_CLIENT_ID as string,
//       clientSecret: process.env.NAVER_CLIENT_SECRET as string,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET!,
//   pages: {
//     signIn: "/login",
//     error: "/login/error", // 커스텀 에러 페이지 설정
//   },
//   callbacks: {
//     async signIn({ user, account }: any): Promise<any> {
//       console.log(
//         "----------user----------",
//         user,
//         "--------account--------",
//         account,
//       );

//       if (
//         account?.provider === "naver" ||
//         account?.provider === "google" ||
//         account?.provider === "kakao"
//       ) {
//         const { provider, providerAccountId } = account;
//         const { email, name, image } = user;
//         const emailAddress = email || "";

//         try {
//           const existingUserDoc = await getDoc(
//             doc(firestore, "users", emailAddress),
//           );
//           if (!existingUserDoc) {
//             // 회원가입 유저일 경우 토큰 생성
//             const jwtToken = jwt.sign(
//               {
//                 email,
//                 name,
//                 id: providerAccountId,
//                 image,
//                 providerAccountId: provider,
//               },
//               process.env.NEXT_PUBLIC_JWT_SECRET!,
//               { expiresIn: "30m" },
//             );
//             const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
//             // cookie 값 세팅을 위한 route api 핸들러 라우팅
//             return `${baseUrl}/api/cookie?token=${jwtToken}`;
//           }

//           // const socialUserDoc = await getDoc(
//           //   doc(firestore, "socialUsers", emailAddress),
//           // );
//           if (
//             existingUserDoc.exists() &&
//             existingUserDoc.data().provider !== provider
//           ) {
//             throw new Error(
//               "이미 해당 이메일로 다른 제공자를 통해 회원가입이 되어 있습니다.",
//             );
//           }

//           console.log("auth2=======", auth);
//           console.log("emailAddress2=======", emailAddress);
//           console.log("providerAccountId2=======", providerAccountId);

//           const userCredential = await signInWithEmailAndPassword(
//             auth,
//             emailAddress,
//             providerAccountId,
//           );
//           console.log("auth=======", auth);
//           console.log("emailAddress=======", emailAddress);
//           console.log("providerAccountId=======", providerAccountId);

//           const firebaseUser = userCredential.user;

//           return {
//             id: firebaseUser.uid,
//             name: firebaseUser.displayName,
//             email: firebaseUser.email,
//             accessToken: await firebaseUser.getIdToken(),
//           };
//         } catch (error) {
//           console.error("Firebase 로그인 오류:", error);
//           throw new Error("소셜 로그인에 실패했습니다.");
//         }
//       }
//       return true;
//     },
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.role = user.role;
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name;
//         token.image = user.image;
//         token.accessToken = user.accessToken; // JWT에 액세스 토큰을 추가
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.email = token.email;
//         session.user.name = token.name;
//         session.user.accessToken = token.accessToken; // 세션에 액세스 토큰을 추가
//       }
//       return session;
//     },
//     redirect: async ({ baseUrl }) => {
//       return `${baseUrl}/home`;
//     },
//   },
// });

// export const { GET, POST } = handlers;

import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firebase/firebaseConfig";
import { compare } from "bcryptjs";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "아이디" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "비밀번호",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        console.log("일반로그인 입력한 아이디 ", username);
        console.log("일반로그인 입력한 비밀번호", password);

        // Firebase에서 사용자 정보 가져오기
        const q = query(collection(firestore, "users"), where("userId", "==", username));
        const querySnapshot = await getDocs(q);
        console.log("아이디 값======", querySnapshot);

        if (querySnapshot.empty) {
          throw new Error("아이디가 없음");
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        //console.log("123123123123123", userData.password);

        const isValidPassword = await compare(password as string, userData.password as string);

        if (!isValidPassword) {
          throw new Error("비밀번호가 잘못되었습니다.");
        }

        return {
          id: userDoc.id,
          name: userData.name,
          email: userData.email,
        };
      },
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
