import BodyFont from "@/common/BodyFont";
import CardWrap from "@/common/CardWrap";
import HeadingFont from "@/common/HeadingFont";
import Link from "next/link";
/**
 * ROOT NotFound 페이지
 * 페이지 경로가 잘못되었을 때 보여지는 404 페이지
 */
export default function NotFound() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <CardWrap width="609px" height="456px">
        <div className="flex flex-col justify-center items-center w-full h-full gap-9 p-20">
          <div className="space-y-4 text-center">
            <HeadingFont level="4" weight="bold">
              요청하신 페이지를 찾을 수 없습니다.
            </HeadingFont>
            <BodyFont level="3" weight="medium">
              페이지의 주소가 잘못 입력되었거나 <br />
              주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
            </BodyFont>
          </div>
          <Link
            className="bg-primary-900 hover:bg-primary-800 text-white w-[386px] py-[18px] rounded-lg flex justify-center items-center"
            href="/"
          >
            홈으로 이동하기
          </Link>
        </div>
      </CardWrap>
    </div>
  );
}
