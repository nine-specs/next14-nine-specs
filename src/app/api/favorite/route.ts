import { firestore } from "@/firebase/firebaseConfig";
import { TStocks } from "@/hooks/profile/useStocksHandler";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
const uid = "tvJNWYbo9hcAI2Sn0QtC";
// 내 관심종목 추가
export async function POST(request: NextRequest) {
  // 임시 유저 uid

  const { stockName } = await request.json();
  try {
    // stocks 콜렉션 참조
    const stocksRef = collection(firestore, "stocks");

    // stockName이 일치하는 도큐먼트를 찾는 하나만 쿼리.
    const q = query(stocksRef, where("stockName", "==", stockName), limit(1));

    // 쿼리 실행
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { message: "해당 주식 데이터를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    const stockData = querySnapshot.docs[0].data();

    // 유저의 myStocks 서브콜렉션 참조
    const userStocksCollectionRef = collection(
      firestore,
      `users/${uid}/myStocks`,
    );

    // 관심종목 데이터 추가
    await addDoc(userStocksCollectionRef, {
      stockName: stockName,
      stockId: stockData.stockId,
      // logoUrl: stockData.logoUrl, // 필요시 추가
      stockCode: stockData.stockCode,
    });

    console.log("내관심종목 추가완료");
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("주식 데이터를 추가하는 중 에러 발생:", error);
    return NextResponse.json(
      { message: "관심종목 추가에 실패했습니다." },
      { status: 500 },
    );
  }
}
/**  내 관심종목 삭제 */
export async function DELETE(request: NextRequest) {
  // 임시 유저 uid
  try {
    const { stockName } = await request.json();

    // 'users' 콜렉션에서 특정 유저의 문서 참조
    const userRef = doc(firestore, "users", uid);

    // 유저 문서의 서브콜렉션 'myStocks' 참조
    const myStocksRef = collection(userRef, "myStocks");

    // 'myStock' 필드가 stockName과 일치하는 문서를 찾기 위한 쿼리
    const q = query(myStocksRef, where("stockName", "==", stockName));

    // 쿼리 실행
    const querySnapshot = await getDocs(q);

    // 조회되는 첫번째 문서를 삭제 (문서가 하나만 반환된다고 가정)
    if (!querySnapshot.empty) {
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(docToDelete.ref);
      console.log(`나의관심종목 1개 삭제함`);

      return NextResponse.json({ status: 200 });
    } else {
      console.log("일치하는 관심종목 찾지못함");
    }
  } catch (error) {
    console.log("관심종목 삭제중 에러발생:" + error);
    return NextResponse.json(
      { message: "관심종목 삭제에 실패했습니다." },
      { status: 500 },
    );
  }
}
