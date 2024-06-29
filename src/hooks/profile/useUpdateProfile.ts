"use server";

import { firestore, storage } from "@/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { revalidatePath } from "next/cache";

export async function useUpdateProfile(formData: FormData) {
  const file = formData.get("file") as File;
  const displayName = formData.get("displayName") as string;

  console.log("전달받은 폼데이터:", formData);
  console.log("파일 이름:", file.name);
  console.log("닉네임:", displayName);

  // 임시 uid 설정
  const uid = "WJBBuka8oDKBIjASaEd1";
  const userDocRef = doc(firestore, "users", uid);

  if (file) {
    try {
      // <스토리지 저장>
      // 파일이 null이 아니면 실행
      console.log("파일 있음");

      // 파일의 경로 및 파일명 설정
      // userProfile이라는 폴더를 만들고 그 뒤에 uid 경로
      const locationRef = ref(storage, `userProfile/${uid}`);

      // 스토리지에 파일 업로드. 성공 시 결과 반환
      const result = await uploadBytes(locationRef, file);

      // 반환값을 통해 저장된 파일의 URL 가져옴
      const url = await getDownloadURL(result.ref);
      console.log("파일 URL:", url);

      // <DB에 프로필 사진의 URL과 닉네임 업데이트>
      await updateDoc(userDocRef, {
        profileImage: url,
        displayName: displayName, // 닉네임도 함께 업데이트
      });
    } catch (error) {
      console.log("에러 발생:", error);
    }
  } else {
    console.log("파일이 없습니다.");
  }

  revalidatePath("/mypage/profile");
}
