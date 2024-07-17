import { StockInfo } from "@/components/Report/type/report/stockType";
import { firestore } from "@/firebase/firebaseConfig";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export async function GET(request: Request) {
  const { uid } = await request.json();
  const getStockList = async (uid: string) => {
    const userDocRef = doc(firestore, "favor", uid);
    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data().stockList;
      } else {
        console.log("No such document!");
        return [];
      }
    } catch (e) {
      console.error("Error getting document: ", e);
      return [];
    }
  };

  const stockList = await getStockList(uid);

  return new Response(JSON.stringify(stockList), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  console.log("POST request");
  const {
    uid = "gU8dSD4pRUHr7xAx9cgL",
    stockList = [
      {
        ticker: "AAPL",
        name: "애플",
        code: "AAPL.O",
      },
    ],
  } = await request.json();
  const addStockList = async (uid: string, stockList: StockInfo[]) => {
    const userDocRef = doc(firestore, "favor", uid);
    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          stockList: arrayUnion(...stockList),
        });
      } else {
        await setDoc(userDocRef, {
          stockList: stockList,
        });
      }

      console.log("Document successfully written or updated!");
    } catch (e) {
      console.error("Error writing or updating document: ", e);
    }
  };

  await addStockList(uid, stockList);

  return new Response("Stock list added or updated successfully", {
    status: 200,
  });
}
