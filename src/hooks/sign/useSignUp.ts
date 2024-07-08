"use server";
import { firestore, storage } from "@/firebase/firebaseConfig";
import { hash } from "bcrypt";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useSignUp = () => {
  const signUp = async (
    name: string,
    userId: string,
    password: string,
    email: string,
    phone: string,
    birthdate: string,
    nick: string,
    interests: string[], // 관심종목 추가
    file: File | null, // 이미지 추가
  ) => {
    try {
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

  return { signUp };
};

export default useSignUp;
