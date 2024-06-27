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

export async function GET(request: Request) {
  // 유저 정보 타입
  type TUser = {
    birthdate: string; // 생년월일
    email: string; // 이메일
    favorite: string; // 관심종목
    lang: string; //언어 설정
    profileImage: string; //프로필사진
    phone: string; //휴대폰
    userId: string; //아이디
    username: string; //이름
    //displayName :string // 닉네임
    //   createdAt: string;
  };
  // 유저데이터 firestoreDB 요청
  const fetchUser = async () => {};
  // 임시더미 uid 이용
  const uid = "WJBBuka8oDKBIjASaEd1";
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
      favorite: userData.favorite,
      lang: userData.lang,
      profileImage: userData.profileImage,
      phone: userData.phone,
      userId: userData.userId,
      username: userData.username,
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
