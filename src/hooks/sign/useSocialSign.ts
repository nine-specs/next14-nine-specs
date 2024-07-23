"use server";
import { firestore, storage } from "@/firebase/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { TStocks } from "../profile/useStocksHandler";
import { TstockInfoList } from "@/app/(afterLogin)/favorite/_components/FavoriteStockLists";
import { updateData } from "@/components/Report/StockHeader/StockFavorButton";

export async function SocialSignUp(
  userInfo: {
    id: string;
    name: string;
    email: string;
    image: string;
    provider: string;
  },
  formData: {
    nick: string;
    phone: string;
    birthdate: string;
    stocks: string[];
    file: File | null;
  },
) {
  const { id, name, email, image, provider } = userInfo;
  const { nick, phone, birthdate, stocks, file } = formData;
  console.log("userInfo", userInfo);
  console.log("formData", formData);

  let imageURL = image;

  if (file && file.size > 0) {
    try {
      const storageRef = ref(storage, `userProfile/${id}`);
      const snapshot = await uploadBytes(storageRef, file);
      imageURL = await getDownloadURL(snapshot.ref);
      console.log("프로필 사진 업로드 완료:", imageURL);
    } catch (error) {
      console.error("프로필 사진 업로드 에러:", error);
      return {
        success: false,
        error: "프로필 사진 업로드에 실패했습니다.",
      };
    }
  } else {
    console.log("파일이 없습니다. userInfo 이미지 업로드 시도 중...");
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `userProfile/${id}`);
      const snapshot = await uploadBytes(storageRef, blob);
      imageURL = await getDownloadURL(snapshot.ref);
      console.log("userInfo 이미지 업로드 완료:", imageURL);
    } catch (error) {
      console.error("userInfo 이미지 업로드 에러:", error);
      return {
        success: false,
        error: "userInfo 이미지 업로드에 실패했습니다.",
      };
    }
  }

  let accountType = "";
  if (provider === "kakao") {
    accountType = "K";
  } else if (provider === "naver") {
    accountType = "N";
  } else if (provider === "google") {
    accountType = "G";
  }

  try {
    const userDocRef = await addDoc(collection(firestore, "users"), {
      id,
      name,
      nick,
      image: imageURL,
      phone,
      birthdate,
      email,
      createdAt: new Date(),
      accountType,
      language: "USA",
    });

    //  << 관심종목>>
    const myStockStr = stocks.join(" ");
    let myStock: string[] = [];
    if (myStockStr != undefined) {
      myStock = myStockStr.split("#").join("").split(" ");
    }

    //주식데이터 가져오기
    const stocksRef = collection(firestore, "stocks");
    const q = query(stocksRef, where("stockName", "in", myStock));
    const querySnapshot = await getDocs(q);
    const stockList: TStocks[] = [];
    querySnapshot.forEach((doc) => {
      stockList.push(doc.data() as TStocks);
    });

    const myStocksCollectionRef = collection(firestore, "users", userDocRef.id, "myStocks");

    const addStockPromises = stockList.map(async (stock) => {
      await addDoc(myStocksCollectionRef, {
        stockName: stock.stockName,
        stockId: stock.stockId,
        // logoUrl: stockData.logoUrl, // 필요시 추가
        stockCode: stock.stockCode,
      });
    });
    //조영님 관심종목 콜렉션 추가
    let stockInfoList: TstockInfoList = [];
    stockList.forEach((a, i) => {
      stockInfoList.push({
        ticker: a.stockId,
        name: a.stockName,
        code: a.stockCode,
      });
    });
    stockInfoList.forEach((a) => {
      updateData(userDocRef.id, a);
    });
    //조영님 관심종목 콜렉션 추가 끝

    await Promise.all(addStockPromises);
    console.log("회원 가입 및 프로필 설정 완료");
    return { success: true };
  } catch (error) {
    console.error("회원 가입 및 프로필 설정 실패:", error);
    return {
      success: false,
      error: "회원 가입 및 프로필 설정에 실패했습니다.",
    };
  }
}
