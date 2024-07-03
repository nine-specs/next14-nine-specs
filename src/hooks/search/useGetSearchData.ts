"use server";

import { TUser } from "@/app/api/profile/route";
import { firestore } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// export type TRecentSearchWordUserPick = Pick<TUser, "recentSearchWord">;

/** 유저의 최근검색 데이터만 가져오기 */
export async function getRecentSearches() {
  // 임시더미 uid 이용∫
  const uid = "WJBBuka8oDKBIjASaEd1";

  try {
    // users 컬렉션에서 uid 일치하는 document 찾기
    const userDocRef = doc(firestore, "users", uid);
    // document 가져오기
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log("Document data:", userDocSnap.data());

      const userData = userDocSnap.data() as TUser;

      // recentSearchWord 필드만 추출
      const recentSearchWord = userData.recentSearchWord;

      return recentSearchWord;
    } else {
      console.log("문서없음");
      return [];
    }
  } catch (error) {
    console.error("에러발생", error);
    return [];
  }
}
