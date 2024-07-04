"use server";
import { firestore } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export async function useSearchAction(formData: FormData) {
  const keyword = formData.get("keyword") as string;
  console.log("서버액션실행-전달받은 데이터:" + keyword);

  // 3. 해당 유저 도커먼트의 recentSearchWord에 추가해 수정.
  // 임시 uid 설정
  const uid = "WJBBuka8oDKBIjASaEd1";

  // 현재 날짜를 "MM.DD" 형식으로 가져오기
  const today = new Date();
  const formattedDate = `${("0" + (today.getMonth() + 1)).slice(-2)}.${(
    "0" + today.getDate()
  ).slice(-2)}`;

  try {
    // 주식종목명 = keyword인 주식종목의 searchCount +1
    const stocksRef = collection(firestore, "stocks");
    const q = query(stocksRef, where("stockName", "==", keyword));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot:" + querySnapshot.docs[0]);

    querySnapshot.forEach(async (doc) => {
      const stockData = doc.data();
      const newSearchCount = (stockData.searchCount || 0) + 1;

      await updateDoc(doc.ref, {
        searchCount: newSearchCount,
      });
    });

    //검색어가 주식종목에 포함된다면 최근검색어로 저장
    if (querySnapshot.docs[0]) {
      const userDocRef = doc(firestore, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const recentSearchWords = userData.recentSearchWord || [];

        recentSearchWords.unshift({ keyword: keyword, date: formattedDate });

        await updateDoc(userDocRef, {
          recentSearchWord: recentSearchWords,
        });
      } else {
        await updateDoc(userDocRef, {
          recentSearchWord: [{ keyword, date: formattedDate }],
        });
      }
    }
  } catch (error) {
    console.log("에러 발생:", error);
  }

  // 5. keyword = 연관 종목인 뉴스 도커먼트 가져오기
  // 6. Keyword = 주식종목명인 주식종목 가져오기
  return;
}
