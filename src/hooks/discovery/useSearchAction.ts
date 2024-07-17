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
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function useSearchAction(formData: FormData) {
  const keyword = formData.get("keyword") as string;
  console.log("서버액션실행-전달받은 데이터:" + keyword);

  // 현재 날짜를 "MM.DD" 형식으로 가져오기
  const today = new Date();
  const formattedDate = `${("0" + (today.getMonth() + 1)).slice(-2)}.${(
    "0" + today.getDate()
  ).slice(-2)}`;

  AddSearchCount(keyword); // 검색카운트 +1

  //주식종목의 uid를 넘길 예정
  redirect(`/discovery/${encodeURIComponent(keyword)}`);
  // revalidatePath(`/discovery/${keyword}`);
  // revalidatePath("/");
  // 5. keyword = 연관 종목인 뉴스 도커먼트 가져오기
  // 6. Keyword = 주식종목명인 주식종목 가져오기
}

/**    // 주식종목명 = keyword인 주식종목의 searchCount +1 */
export async function AddSearchCount(keyword: string) {
  try {
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
  } catch (error) {
    console.log("에러 발생:", error);
  }
}
