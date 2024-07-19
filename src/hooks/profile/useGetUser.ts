"use server";

import { TUser } from "@/app/api/profile/route";
import { firestore } from "@/firebase/firebaseConfig";
import { getSession } from "@/lib/getSession";
import { compare, hash } from "bcrypt";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// 임시 uid 설정
const uid = "tvJNWYbo9hcAI2Sn0QtC";
export async function GetUser() {
  // 유저데이터 firestoreDB 요청
  // const fetchUser = async () => {};
  // 세션 또는 전역에서 회원정보가져오기

  try {
    //users콜렉션에서  uid 일치하는 document찾기
    const userDocSnap = await getDoc(doc(firestore, "users", uid));

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as TUser;

      // Timestamp 변환
      if (userData.createdAt instanceof Timestamp) {
        userData.createdAt = userData.createdAt.toDate().toISOString();
      }

      return userData;
    }
  } catch (error) {
    console.error("유저정보 가져오는 중 에러발생:", error);
    throw error;
  }
}

export async function DeleteUser() {}

/**유저 비밀번호,폰,생년월일 변경 */
export async function UpdateUser(formData: FormData) {
  const newData: any = {};

  if (formData.get("password")) {
    const newPassword = formData.get("password") as string;
    const hashedPassword = await hash(String(newPassword), 10);
    newData.password = hashedPassword;
  }
  newData.phone = formData.get("phone") as string;
  newData.birthdate = formData.get("birthdate") as string;

  try {
    // 문서 업데이트
    await updateDoc(doc(firestore, "users", uid), newData);
    console.log("회원정보 수정 완료");

    revalidatePath("/mypage/profile");
  } catch (error) {
    console.log("회원정보 수정 중 에러발생: " + error);
  }
}
