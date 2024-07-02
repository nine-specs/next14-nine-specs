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
  // 임시더미 uid 이용
  const uid = "WJBBuka8oDKBIjASaEd1";
  // const uid = "f3Gth4ckW6Ivx2EZVR1P";

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
      displayName: userData.displayName,
      myStock: userData.myStock,
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
