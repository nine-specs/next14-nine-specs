import { StockInfo } from "@/components/Report/type/report/stockType";
import { firestore } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const stockName = url.searchParams.get("stockName");
  if (!stockName) {
    return new Response("Stock name is missing", { status: 400 });
  }
  const stockRef = doc(firestore, "stockList", stockName); // 문서 참조 생성
  const docSnap = await getDoc(stockRef); // 문서 조회

  if (!docSnap.exists()) {
    return new Response("Stock not found", { status: 404 });
  }
  return new Response(JSON.stringify(docSnap.data()));
}

export async function POST(request: Request) {
  const req: StockInfo[] = await request.json(); // 요청으로부터 주식 이름과 데이터를 추출
  for (const stock of req) {
    const stockRef = doc(firestore, "stockList", stock.name); // 문서 참조 생성
    await setDoc(stockRef, stock);
  }

  return new Response("Stock data has been added successfully.", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
