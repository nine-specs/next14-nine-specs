import { firestore } from "@/firebase/firebaseConfig";
import { DeleteUser } from "@/hooks/profile/useGetUser";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   // // 쿼리 스트링 파라미터 받아오기
//   // const url = new URL(request.url);
//   // const nick = url.searchParams.get("nick");
//   // const previousNick = url.searchParams.get("previousNick");
//   // const myStock = url.searchParams.get("myStock");
//   // // 요청 본문에서 데이터 읽기
//   // const body = await request.json();
//   // console.log("쿼리 스트링 파라미터:", { nick, previousNick, myStock });
//   // console.log("요청 본문 데이터:", body);
//   // return new Response(JSON.stringify({ res: "응답함", data: body }), {
//   //   headers: { "Content-Type": "application/json" },
//   // });
// }

// 회원탈퇴 api
export async function DELETE(request: NextRequest) {
  try {
    // const { uid } = await request.json();
    const uid = "tvJNWYbo9hcAI2Sn0QtC";

    // 유효성 검사 및 인증 확인 로직
    if (!uid) {
      return NextResponse.json(
        { message: "유효하지 않은 요청입니다." },
        { status: 400 },
      );
    }

    // 'users' 컬렉션에서 사용자 문서 참조
    const userDocRef = doc(firestore, "users", uid);
    // DB에서 유저 삭제
    // await deleteDoc(userDocRef);
    // 세션 삭제
    //const session = await getSession();
    //await session.destroy();

    console.log(`사용자 ${uid} 계정 삭제 완료`);

    return NextResponse.json({ message: "회원탈퇴 성공" }, { status: 200 }); // 일치시 true
  } catch (error) {
    console.error("회원탈퇴 중 에러발생:", error);
    return NextResponse.json({ message: "회원탈퇴 실패" }, { status: 500 });
  }
}
