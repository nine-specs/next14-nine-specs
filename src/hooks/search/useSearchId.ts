"use server";

import { firestore } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function registeredId(formData: FormData) {
  const userSearchData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
  };

  const { name, phone } = userSearchData;

  // 입력값 및 유효성 검사
  const missingFields = [];
  if (!name) {
    missingFields.push("이름을 입력해주세요");
  }

  const phoneRegex = /^\d{11}$/;
  if (!phone || !phoneRegex.test(phone)) {
    if (!phone) {
      missingFields.push("핸드폰 번호를 입력해주세요.");
    } else {
      missingFields.push("핸드폰 번호는 숫자로 이루어진 11자리여야 합니다.");
    }
  }

  if (missingFields.length > 0) {
    console.log(`${missingFields.join("\n")}`);
    return { success: false, message: missingFields.join("\n") };
  }

  try {
    // 파이어베이스에서 name과 phone을 기준으로 회원 조회
    const userQuery = query(
      collection(firestore, "users"),
      where("name", "==", name),
      where("phone", "==", phone),
    );
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // 사용자가 존재하는 경우
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      userData.docId = userDoc.id; //고유한 문서 ID 값 가져오기

      if (userData.createdAt && userData.createdAt.toDate) {
        userData.createdAt = userData.createdAt.toDate().toISOString();
      }
      console.log(userData);
      return { success: true, userData };
    } else {
      // 사용자가 존재하지 않는 경우
      return { success: false, message: "사용자를 찾을 수 없습니다." };
    }
  } catch (error) {
    console.error("Error searching document: ", error);
    return { success: false, message: "문서 검색 중 오류가 발생했습니다." };
  } finally {
    // redirect("/search/searchedId");
  }
}
