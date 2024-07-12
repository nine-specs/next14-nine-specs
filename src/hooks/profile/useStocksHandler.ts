"use server";
import { TUser } from "@/app/api/profile/route";
import { firestore } from "@/firebase/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

type TStocks = {
  stockId: string;
  stockName: string;
  searchCount: number;
};

type TMyStocks = {
  myStock: string;
};
/**주식 목록 가져오기 */
export async function getStockList() {
  const stockList: TStocks[] = [];
  try {
    const stocksRef = collection(firestore, "stocks");
    const querySnapshot = await getDocs(stocksRef);
    querySnapshot.forEach((doc) => {
      stockList.push(doc.data() as TStocks);
    });
  } catch (error) {
    console.log("에러발생:" + error);
  }
  return stockList;
}

/**내 관심종목 가져오기 */
export async function getMyStocks() {
  // //session에서 로그인회원정보 가져오기

  // //테스트용 uid
  const uid = "gU8dSD4pRUHr7xAx9cgL";
  const userId = uid;

  const myStocks: string[] = [];
  try {
    //users콜렉션에서  myStocks 서브콜렉션가져오기
    const myStocksRef = collection(firestore, "users", userId, "myStocks");
    const myStocksSnapshot = await getDocs(query(myStocksRef));
    myStocksSnapshot.forEach((stockDoc) => {
      const data = stockDoc.data() as TMyStocks;
      myStocks.push(data.myStock);
    });
  } catch (error) {
    console.log("에러발생:" + error);
  }
  return myStocks;
}

/**입력된 키워드를 통해 주식종목가져오기 */
export async function getStockByKeyword(keyword: string) {
  const stockList: TStocks[] = [];
  try {
    const stocksRef = collection(firestore, "stocks");
    const q = query(
      stocksRef,
      where("stockName", ">=", keyword),
      where("stockName", "<", keyword + "\uf8ff"),
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      stockList.push(doc.data() as TStocks);
    });

    return stockList;
  } catch (error) {
    console.log("키워드조회 에러발생:" + error);
  }
}

/**나의 관심종목 삭제하기 */
export async function deleteMyStocks(stockName: string) {
  //임시 유저 uid
  const uid = "gU8dSD4pRUHr7xAx9cgL";
  try {
    // 'users' 콜렉션에서 특정 유저의 문서 참조
    const userRef = doc(firestore, "users", uid);

    // 유저 문서의 서브콜렉션 'myStocks' 참조
    const myStocksRef = collection(userRef, "myStocks");

    // 'myStock' 필드가 stockName과 일치하는 문서를 찾기 위한 쿼리
    const q = query(myStocksRef, where("myStock", "==", stockName));

    // 쿼리 실행
    const querySnapshot = await getDocs(q);

    // 조회되는 첫번째 문서를 삭제 (문서가 하나만 반환된다고 가정)
    if (!querySnapshot.empty) {
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(docToDelete.ref);
      console.log(`나의관심종목 1개 삭제함`);
    } else {
      console.log("일치하는 관심종목 찾지못함");
    }
  } catch (error) {
    console.log("관심종목 삭제중 에러발생:" + error);
  }
  // 페이지 재검증, 재생성
  revalidatePath("/favorite");
}
