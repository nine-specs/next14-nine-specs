import { firestore } from "@/firebase/firebaseConfig";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";

export async function POST(request: Request) {
  const { relatedStocks } = await request.json();

  try {
    // 'articles' 컬렉션 그룹에서 relatedStocks 문서 검색
    const q = query(
      collectionGroup(firestore, "articles"),
      where("relatedStocks", "array-contains-any", relatedStocks),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // 기사 3개만 가져오도록 slice 처리
      const categoryNews = querySnapshot.docs.slice(0, 3).map((doc) => doc.data());

      return new Response(JSON.stringify(categoryNews), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "No related news articles found" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
