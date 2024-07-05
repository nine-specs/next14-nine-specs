"use server";

import { TUser } from "@/app/api/profile/route";
import { firestore } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

/**단일 최근 검색어 삭제하기 */
export async function DeleteSearchData(keyword: string) {
  // 임시더미 uid 이용
  const uid = "WJBBuka8oDKBIjASaEd1";
  try {
    // users 컬렉션에서 uid와 일치하는 문서 찾기
    const userDocRef = doc(firestore, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as TUser;

      // recentSearchWord 배열에서 keyword와 일치하지 않는 항목만 필터링.
      const newRecentSearchWord = userData.recentSearchWord.filter(
        (a) => a.keyword !== keyword,
      );

      // 업데이트된 배열을 Firestore에 저장
      await updateDoc(userDocRef, {
        recentSearchWord: newRecentSearchWord,
      });

      console.log(` ${keyword} 삭제 성공`);
      return { success: true, message: "삭제완료" };
    } else {
      return { success: false, message: "문서를 못찾음" };
    }
  } catch (error) {
    console.error("에러발생!:", error);
    return { success: false, message: "삭제 중 에러발생" };
  }
}
/**모든 최근검색어 삭제하기 */
export async function DeleteAllSearchData() {
  // 임시더미 uid 이용
  const uid = "WJBBuka8oDKBIjASaEd1";
  try {
    // users 컬렉션에서 uid와 일치하는 문서 찾기
    const userDocRef = doc(firestore, "users", uid);

    // recentSearchWord 빈 배열로 초기화
    await updateDoc(userDocRef, {
      recentSearchWord: [],
    });

    return { success: true, message: "삭제완료" };
  } catch (error) {
    console.error("에러발생!:", error);
    return { success: false, message: "삭제 중 에러발생" };
  }
}
