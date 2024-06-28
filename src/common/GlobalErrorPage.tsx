import HeadingFont from "./HeadingFont";
import BodyFont from "./BodyFont";
import Link from "next/link";
import CardWrap from "./CardWrap";
import ExclamationIcon from "../../public/images/Exclamation_icon.svg";
/**
 * 글로벌 에러 페이지
 */
export default function GlobalErrorPage() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <CardWrap width="609px" height="460px">
        <div className="flex flex-col justify-center items-center w-full h-full  p-20">
          <div className="flex justify-center mb-6">
            <ExclamationIcon width={64} height={64} />
          </div>
          <div className="space-y-4 text-center mb-9">
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
