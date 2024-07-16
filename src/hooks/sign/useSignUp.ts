"use server";
import { firestore, storage } from "@/firebase/firebaseConfig";
import { hash } from "bcrypt";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const signUp = async (
  data: {
    name: string;
    userId: string;
    password: string;
    email: string;
    phone: string;
    birthdate: string;
    //nick: string;
  },
  formData: FormData,
) => {
  const { name, userId, password, email, phone, birthdate } = data;
  const nick = formData.get("nick");
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

    let imageURL = ""; // 이미지 URL 초기화
    if (file && file.size > 0) {
      try {
        const storageRef = ref(storage, `userProfile/${userId}`);
        const snapshot = await uploadBytes(storageRef, file);
        imageURL = await getDownloadURL(snapshot.ref);
        console.log("프로필 사진 업로드 완료");
      } catch (error) {
        console.error("프로필 사진 업로드 에러:", error);
      }
    } else {
      console.log("파일이 없습니다.");
    }

    const hashedPassword = await hash(String(password), 10);
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

    let interests: string[] = [];
    if (myStockStr != undefined) {
      interests = myStockStr.split("#").join("").split(" ");
    }

    const myStocksCollectionRef = collection(
      firestore,
      "users",
      userDocRef.id,
      "myStocks",
    );

    const addStockPromises = interests.map(async (stock) => {
      await addDoc(myStocksCollectionRef, {
        myStock: stock,
      });
    });

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
export default signUp;
