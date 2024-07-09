import CardWrap from "./CardWrap";
import Image from "next/image";
/**
 * 글로벌 로딩 컴포넌트
 * 페이지가 로딩시 보여지는 컴포넌트
 * @returns 로딩 페이지
 */
export default function LoadingPage() {
  return (
    <section className="flex items-center w-full h-[100vh] justify-center">
      <CardWrap width="256px" height="256px">
        <div className="flex w-full h-full justify-center items-center">
          <Image
            src="/images/loading/loadingSpiner.gif"
            alt="loading"
            unoptimized
            width={96}
            height={96}
          />
        </div>
      </CardWrap>
    </section>
  );
}
