import CardWrap from "@/common/CardWrap";
import Title from "../_ui/Title";
import StockList from "../_ui/StockList";
import NOTFOUND_ICON from "../../../../../public/images/Not_found_icon.svg";
import BodyFont from "@/common/BodyFont";

/**
 * 유저의 최근 조회
 */
export default function RecentlyViewed() {
  return (
    <>
      <div className="flex-1">
        <Title title="최근 조회" />

        <div className="h-[384px]">
          <CardWrap
            width="100%"
            height="100%"
            // className="flex flex-col items-center justify-center"
          >
            <div className="py-8 px-12">
              <StockList />
            </div>
            {/* <div className="flex flex-col items-center gap-3">
              <NOTFOUND_ICON />
              <BodyFont level="1" weight="medium" className="text-primary-900">
                최근 조회한 종목이 없습니다.
              </BodyFont>
            </div> */}
          </CardWrap>
        </div>
      </div>
    </>
  );
}
