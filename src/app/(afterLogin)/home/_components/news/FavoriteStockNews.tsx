import SubTitle from "../../_ui/SubTitle";
import NewsCardCarousel from "../../_ui/NewsCardCarousel";

/**
 * 관심 종목 뉴스
 */
export default function FavoriteStockNews() {
  return (
    <>
      <div>
        <SubTitle subTitle="관심 종목" />
        <NewsCardCarousel />
      </div>
    </>
  );
}
