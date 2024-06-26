import CardWrap from "@/common/CardWrap";

export default function loading() {
  return (
    <section className="flex items-center w-[100vw] h-[100vh] justify-center">
      <CardWrap>
        <div className="flex w-full h-full justify-center items-center">
          <h2>리포트 페이지 Loading 입니다.</h2>
          {/*  추후에 로딩 스피너로 대체 */}
        </div>
      </CardWrap>
    </section>
  );
}
