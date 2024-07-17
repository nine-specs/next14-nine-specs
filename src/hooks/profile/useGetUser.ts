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
  Timestamp,
  where,
} from "firebase/firestore";

export async function GetUser() {
  // 유저데이터 firestoreDB 요청
  // const fetchUser = async () => {};
  // 세션 또는 전역에서 회원정보가져오기
  try {
    // 임시 uid 설정
    const uid = "tvJNWYbo9hcAI2Sn0QtC";

    //users콜렉션에서  uid 일치하는 document찾기
    const userDocRef = doc(firestore, "users", uid);
    //document 가져오기
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as TUser;

      // Timestamp 변환
      if (userData.createdAt instanceof Timestamp) {
        userData.createdAt = userData.createdAt.toDate().toISOString();
      }

      // const fetchedUser = {
      //   birthdate: userData.birthdate,
      //   email: userData.email,
      //   language: userData.language,
      //   image: userData.image,
      //   phone: userData.phone,
      //   userId: userData.userId,
      //   name: userData.name,
      //   nick: userData.nick,
      //   myStocks: userData.myStocks,
      // };

      return userData;
    }
  } catch (error) {
    console.error("유저정보 가져오는 중 에러발생:", error);
    throw error;
  }
}
