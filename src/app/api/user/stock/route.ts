import { firestore } from "@/firebase/firebaseConfig";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function POST(request: Request) {
  const { userId } = await request.json();

  const userDocRef = doc(firestore, "users", userId);

  try {
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // 하위 컬렉션 접근
      const userStocks = collection(userDocRef, "myStocks");
      const subCollectionSnapshot = await getDocs(userStocks);

      const stocks = subCollectionSnapshot.docs.map((doc) => doc.data());

      return Response.json(stocks);
    } else {
      console.log("해당 문서가 없습니다.");
    }
  } catch (error) {
    console.log("문서 가져오기 오류:", error);
  }
}
