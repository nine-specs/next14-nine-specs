import { firestore } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { NextRequest } from "next/server";

// 유저 정보 타입
export type TUser = {
  birthdate: string; // 생년월일
  email: string; // 이메일
  language: string; //언어 설정
  image: string; //프로필사진
  phone: string; //휴대폰
  userId: string; //아이디
  name: string; //이름
  nick: string; // 닉네임
  createdAt: any; // 이후 변환작업
  myStocks: { myStock: string };
  password: string;
  accountType: string;
};

export async function POST(request: NextRequest) {
  const { uid } = await request.json();
  console.log("uid:" + uid);
  // console.log("userId:" + userId);
  // 유저데이터 firestoreDB 요청
  // 임시더미 uid 이용
  // const uid = "tvJNWYbo9hcAI2Sn0QtC";

  //users콜렉션에서  uid 일치하는 document찾기
  const userDocRef = doc(firestore, "users", uid);
  //document 가져오기
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    console.log("Document data:", userDocSnap.data());

    const userData = userDocSnap.data() as TUser;

    const fetchedUser = {
      birthdate: userData.birthdate,
      email: userData.email,
      language: userData.language,
      image: userData.image,
      phone: userData.phone,
      userId: userData.userId,
      name: userData.name,
      nick: userData.nick,
      myStocks: userData.myStocks,
      accountType: userData.accountType,
    };

    return new Response(JSON.stringify({ res: "응답함", data: fetchedUser }), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    console.log("에러!");
    return new Response(JSON.stringify({ res: "응답함", data: "fail!" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
