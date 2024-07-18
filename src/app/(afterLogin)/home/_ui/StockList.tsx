import CardWrap from "@/common/CardWrap";
import Title from "./Title";
import NOTFOUND_ICON from "../../../../../public/images/Not_found_icon.svg";

import BodyFont from "@/common/BodyFont";
import StockItem from "./StockItem";
import { StockInfo } from "@/components/Report/type/report/stockType";
import { StockCarousel } from "./StockCarousel";

export default async function StockList({
  stocks,
  title,
}: {
  stocks: StockInfo[];
  title: string;
}) {
  const emptyStocks = !stocks.length;

  return (
    <>
      <div className="flex-1">
        <Title title={title} />

        <div className="h-[384px]">
          <CardWrap
            width="100%"
            height="100%"
            className={
              emptyStocks ? "flex flex-col items-center justify-center" : ""
            }
          >
            {emptyStocks ? (
              <div className="flex flex-col items-center gap-3">
                <NOTFOUND_ICON />
                <BodyFont
                  level="1"
                  weight="medium"
                  className="text-primary-900"
                >
                  최근 조회한 종목이 없습니다.
                </BodyFont>
              </div>
            ) : (
              <div className="py-8 px-12">
                <StockCarousel stocks={stocks} />
              </div>
            )}
          </CardWrap>
        </div>
      </div>
    </>
  );
}
