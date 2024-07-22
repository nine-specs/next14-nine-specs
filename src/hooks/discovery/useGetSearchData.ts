"use server";

import { TUser } from "@/app/api/profile/route";
import { firestore } from "@/firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

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

export async function getCurrentTime() {
  // 현재 시간 가져오기
  const now = new Date();

  // 시간과 분을 가져오기
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // 시간과 분이 한 자리 수일 경우 앞에 0을 추가
  let hour = hours < 10 ? "0" + hours : hours;
  let minute = minutes < 10 ? "0" + minutes : minutes;

  // "HH:MM" 형식으로 반환
  return `${hour}:${minute}`;
}
