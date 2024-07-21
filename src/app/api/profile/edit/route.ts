import { firestore, storage } from "@/firebase/firebaseConfig";
import { DeleteUser } from "@/hooks/profile/useGetUser";
import { getSession } from "@/lib/getSession";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 회원탈퇴 api
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    const uid = session?.user?.id;

    // 유효성 검사 및 인증 확인 로직
    if (!uid) {
      return NextResponse.json({ message: "유효하지 않은 요청입니다." }, { status: 400 });
    }
    const subcollections = await getDocs(collection(firestore, `users/${uid}/myStocks`)); // 서브컬렉션의 이름을 적어주세요.
    // 서브컬렉션의 각 문서를 삭제
    for (const subDoc of subcollections.docs) {
      await deleteDoc(subDoc.ref);
    }
    // DB에서 유저 삭제
    await deleteDoc(doc(firestore, "users", uid));

    // 스토리지에서 프로필 사진 삭제
    const { userId } = await request.json();
    const locationRef = ref(storage, `userProfile/${userId}`);
    await deleteObject(locationRef);

    console.log(`사용자 ${uid} 계정 삭제 완료`);

    return NextResponse.json({ message: "회원탈퇴 성공" }, { status: 200 }); // 일치시 true
  } catch (error) {
    console.error("회원탈퇴 중 에러발생:", error);
    return NextResponse.json({ message: "회원탈퇴 실패" }, { status: 500 });
  }
}
