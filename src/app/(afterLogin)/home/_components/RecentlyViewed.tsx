import CardWrap from "@/common/CardWrap";
import Title from "../_ui/Title";
import StockList from "../_ui/StockList";

/**
 * 유저의 최근 조회
 */
export default function RecentlyViewed() {
  return (
    <>
      <div className="flex-1">
        <Title title="최근 조회" />

        <div className="h-[374px]">
          <CardWrap width="100%" height="100%">
            <div className="py-9 px-12">
              <StockList />
            </div>
          </CardWrap>
        </div>
      </div>
    </>
  );
}
