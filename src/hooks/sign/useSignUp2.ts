"use server";
import { firestore, storage } from "@/firebase/firebaseConfig";
import { hash } from "bcrypt";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const signUp2 = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const userId = formData.get("userId") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const nick = formData.get("nick") as string;
  const birthdate = formData.get("birthdate") as string;
  const file = formData.get("file") as File | null;
  const myStockStr = formData.get("myStock") as string | undefined;
  try {
    console.log("name:", name);
    console.log("password:", password);
    console.log("userId:", userId);
    console.log("phone:", phone);
    console.log("birthdate:", birthdate);
    console.log("email:", email);
    console.log("닉네임:", nick);
    console.log("파일 이름:", file?.name);
    console.log("관심종목:", myStockStr);

    // 이미지 관련
    let imageURL = ""; // 이미지 URL 초기화
    if (file && file.size > 0) {
      try {
        // 파일 업로드를 위한 스토리지 레퍼런스 설정
        const storageRef = ref(storage, `userProfile/${userId}`);
        // 파일 업로드 실행
        const snapshot = await uploadBytes(storageRef, file);
        // 업로드 완료 후 파일 URL 가져오기
        imageURL = await getDownloadURL(snapshot.ref);
        console.log("프로필 사진 업로드 완료");
      } catch (error) {
        console.error("프로필 사진 업로드 에러:", error);
      }
    } else {
      console.log("파일이 없습니다.");
    }
    // 사용자 계정 정보 추가
    const hashedPassword = await hash(String(password), 10);
    // Firestore에 사용자 정보 추가
    const userDocRef = await addDoc(collection(firestore, "users"), {
      name,
      nick,
      image: imageURL, // 업로드된 이미지 URL 사용
      userId,
      password: hashedPassword,
      phone,
      birthdate,
      email,
      createdAt: new Date(),
      accountType: "A", // 일반 회원 가입
    });
    console.log("회원 가입 및 프로필 설정 성공!");

    let interests: string[] = [];
    if (myStockStr != undefined) {
      interests = myStockStr.split("#").join("").split(" ");
    }

    // 관심 종목을 서브 콜렉션에 저장
    const myStocksCollectionRef = collection(
      firestore,
      "users",
      userDocRef.id,
      "myStocks",
    );
    // 관심 종목 추가를 위한 Promise 배열
    const addStockPromises = interests.map(async (stock) => {
      await addDoc(myStocksCollectionRef, {
        myStock: stock,
      });
    });
    // 모든 관심 종목 추가 작업 완료까지 기다림
    await Promise.all(addStockPromises);
    console.log("관심 종목 추가 완료");
    return { success: true };
  } catch (error) {
    console.error("회원 가입 및 프로필 설정 실패:", error);
    return {
      success: false,
      error: "회원 가입 및 프로필 설정에 실패했습니다.",
    };
  }
};
export default signUp2;
