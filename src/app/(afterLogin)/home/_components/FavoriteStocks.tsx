import CardWrap from "@/common/CardWrap";
import Title from "../_ui/Title";
import StockList from "../_ui/StockList";

/**
 * 유저의 관심 종목
 */
export default function FavoriteStocks() {
  return (
    <>
      <div className="flex-1">
        <Title title="관심 종목" />

        <div className="h-[384px]">
          <CardWrap width="100%" height="100%">
            <div className="py-8 px-12">
              <StockList />
            </div>
          </CardWrap>
        </div>
      </div>
    </>
  );
}
