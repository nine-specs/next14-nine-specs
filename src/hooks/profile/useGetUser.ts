"use server";

import { TUser } from "@/app/api/profile/route";
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

export async function GetUser() {
  // 유저데이터 firestoreDB 요청
  const fetchUser = async () => {};
  // 세션 또는 전역에서 회원정보가져오기

  // 임시 uid 설정
  const uid = "gU8dSD4pRUHr7xAx9cgL";
  // const uid = "WJBBuka8oDKBIjASaEd1";

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
      myStock: userData.myStocks,
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
