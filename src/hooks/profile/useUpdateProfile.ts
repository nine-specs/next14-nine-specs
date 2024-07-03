"use server";

import { firestore, storage } from "@/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";

//프로필 사진 , 닉네임 , 관심 종목 수정하기
export async function useUpdateProfile(formData: FormData) {
  const file = formData.get("file") as File | null;
  const displayName = formData.get("displayName") as string;
  const myStockStr = formData.get("myStock") as string | undefined;

  console.log("파일 이름:", file?.name);
  console.log("닉네임:", displayName);
  console.log("관심종목:", myStockStr);

  let myStock: string[] = [];
  if (myStockStr != undefined) {
    myStock = myStockStr.split("#").join("").split(" ");
  }

  // 임시 uid 설정
  const uid = "WJBBuka8oDKBIjASaEd1";
  // users 컬렉션에서 uid일치하는 document가져오기
  const userDocRef = doc(firestore, "users", uid);

  if (file && file.size > 0) {
    try {
      // <<이미지파일 스토리지 저장>>
      // 파일이 null이 아니면 실행
      console.log("파일 있음");
      // 파일의 경로 및 파일명 설정
      // userProfile이라는 폴더를 만들고 그 뒤에 uid 경로
      const locationRef = ref(storage, `userProfile/${uid}`);
      // *참고* 위의 경로와 파일명과 동일한 파일이 있다면 덮어씀.
      // 스토리지에 파일 업로드. 성공 시 결과 반환
      const result = await uploadBytes(locationRef, file);
      // 반환값을 통해 저장된 파일의 URL 가져옴
      const url = await getDownloadURL(result.ref);
      console.log("파일 URL:", url);

      // <<DB에 프로필 사진의 URL과 닉네임 업데이트>>
      await updateDoc(userDocRef, {
        profileImage: url,
        displayName: displayName,
        myStock: myStock,
      });
    } catch (error) {
      console.log("에러 발생:", error);
    }
  } else {
    console.log("파일이 없습니다.");
    // file이 없을 때는 닉네임과 관심 종목만 업데이트 진행
    await updateDoc(userDocRef, {
      displayName: displayName,
      myStock: myStock,
    });
  }

  revalidatePath("/mypage/profile");
}
