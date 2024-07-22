import { StockInfo } from "@/components/Report/type/report/stockType";
import { firestore } from "@/firebase/firebaseConfig";
import { deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const CollectionName = "userFavorStockList";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const uid = url.searchParams.get("uid");
  if (!uid) {
    return new Response("uid is required", { status: 400 });
  }
  const getStockList = async (uid: string) => {
    const stockDocRef = doc(firestore, CollectionName, uid);
    const stockDocs = await getDoc(stockDocRef);
    return stockDocs.data();
  };
  const stockList = await getStockList(uid);

  return new Response(JSON.stringify(stockList));
}

export async function POST(request: Request) {
  const { uid, stockInfo } = await request.json();

  if (!uid && !stockInfo) {
    return new Response("uid and stockInfo are required", { status: 400 });
  }
  async function addStock(uid: string, stockInfo: StockInfo) {
    const stockDocRef = doc(firestore, CollectionName, uid);
    await setDoc(
      stockDocRef,
      {
        [stockInfo.name]: stockInfo,
      },
      { merge: true },
    );
  }
  await addStock(uid, stockInfo);

  return new Response("Stock list added or updated successfully", {
    status: 200,
  });
}

export async function PUT(request: Request) {
  const { uid, stockInfo } = await request.json();

  if (!uid || !stockInfo) {
    return new Response("UID and stockInfo are required", { status: 400 });
  }
  const stockDocRef = doc(firestore, CollectionName, uid);

  async function updateStock(uid: string, stockInfo: StockInfo) {
    const stockDocs = await getDoc(stockDocRef);

    if (stockDocs.exists()) {
      const data = stockDocs.data() || {};

      if (data[stockInfo.name]) {
        // 주식 정보 삭제
        await updateDoc(stockDocRef, {
          [stockInfo.name]: deleteField(),
        });
      } else {
        // 주식 정보 추가
        await updateDoc(stockDocRef, {
          [stockInfo.name]: stockInfo,
        });
      }
    } else {
      // 문서가 존재하지 않을 경우, 새로운 문서 생성 및 주식 정보 추가
      await setDoc(stockDocRef, { [stockInfo.name]: stockInfo });
    }
  }

  await updateStock(uid, stockInfo);
  const updatedDoc = await getDoc(stockDocRef);
  const data = updatedDoc.data();
  return new Response(JSON.stringify(data));
}
