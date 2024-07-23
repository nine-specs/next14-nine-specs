import { firestore } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where, DocumentData } from "firebase/firestore";

// 최근 조회 목록
export async function POST(request: Request) {
  const { recentKeywordList } = await request.json();

  const stocksDocRef = collection(firestore, "stocks");

  try {
    let matchingDocuments: DocumentData[] = [];

    for (const keyword of recentKeywordList) {
      const q = query(stocksDocRef, where("stockName", "==", keyword));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        matchingDocuments.push(doc.data());
      });
    }

    // searchCount 제외
    const recentStockList = matchingDocuments.map((list) => {
      return {
        ticker: list.stockId,
        code: list.stockCode,
        name: list.stockName,
      };
    });

    return Response.json(recentStockList);
  } catch (error) {
    console.error("주식 데이터 요청 오류: ", error);
    return Response.json({ message: "주식 데이터 요청에 실패했습니다." }, { status: 500 });
  }
}
