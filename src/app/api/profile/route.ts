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
  createdAt: string;
  myStocks: { myStock: string };
};

export async function GET(request: Request) {
  // 유저데이터 firestoreDB 요청
  const fetchUser = async () => {};
  // 임시더미 uid 이용

  const uid = "gU8dSD4pRUHr7xAx9cgL";

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
