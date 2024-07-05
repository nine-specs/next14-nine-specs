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
} from "firebase/firestore";

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

/**서버액션 : 인기검색어 가져오기 */
export async function getPopularSearches() {
  try {
    //stock 콜렉션의 모든 주식종목들 가져오기
    const stocksCollectionRef = collection(firestore, "stocks");
    // stockName을 정렬 기준으로 내림차순으로 가져오는 쿼리
    const q = query(stocksCollectionRef, orderBy("searchCount", "desc"));
    // 쿼리 적용해 모든 문서 가져오기
    const querySnapshot = await getDocs(q);
    //데이터 배열로 추출
    const stocks = querySnapshot.docs.map((doc) => ({
      // id랑 stockName만 가져옴
      id: doc.id,
      stockName: doc.data().stockName,
      searchCount: doc.data().searchCount,
      // ...doc.data(), 모든 데이터
    }));

    return stocks;
  } catch (error) {
    console.error("에러발생", error);
    return [];
  }
}
