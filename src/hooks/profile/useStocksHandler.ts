"use server";
import { TUser } from "@/app/api/profile/route";
import { firestore } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

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
