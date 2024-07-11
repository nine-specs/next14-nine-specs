import CardWrap from "@/common/CardWrap";
import LoadingPage from "@/common/LoadingPage";

export default function loading() {
  return (
    <section className="flex items-center w-[100vw] h-[100vh] justify-center">
      <CardWrap>
        <div className="flex w-full h-full justify-center items-center">
          <h2>리포트 페이지 Loading 입니다.</h2>
          <LoadingPage />
        </div>
      </CardWrap>
    </section>
  );
}
