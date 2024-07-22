import { firestore } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// 유저 관심 목록
export async function POST(request: Request) {
  const { userId } = await request.json();

  const userStocksRef = collection(firestore, `users/${userId}/myStocks`);

  try {
    const userStocks = await getDocs(userStocksRef);

    if (!userStocks.empty) {
      const stocks = userStocks.docs.map((doc) => {
        const firestoreData = doc.data();

        const transformedData = {
          ticker: firestoreData.stockId,
          code: firestoreData.stockCode,
          name: firestoreData.stockName,
        };

        return transformedData;
      });

      return Response.json(stocks, { status: 200 });
    } else {
      return Response.json({ message: "내 관심 종목 데이터가 없습니다." }, { status: 404 });
    }
  } catch (error) {
    console.error("내 관심 종목 데이터 요청 오류: ", error);
    return Response.json({ message: "내 관심 종목 데이터 요청에 실패했습니다." }, { status: 500 });
  }
}
