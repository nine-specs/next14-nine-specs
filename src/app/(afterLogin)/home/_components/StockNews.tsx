import CardWrap from "@/common/CardWrap";
import Title from "../_ui/Title";
import FavoriteStockNews from "./news/FavoriteStockNews";
import MainNews from "./news/MainNews";
import RecentlyNews from "./news/RecentlyNews";

/**
 * 유저의 주식 뉴스
 */
export default function StockNews() {
  return (
    <>
      <div>
        <Title title="스팩님을 위한 주식뉴스" />

        <CardWrap width="100%" height="100%">
          <div className="p-12 flex flex-col gap-12">
            <FavoriteStockNews />
            <MainNews />
            <RecentlyNews />
          </div>
        </CardWrap>
      </div>
    </>
  );
}
