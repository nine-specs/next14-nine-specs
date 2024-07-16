import CardWrap from "@/common/CardWrap";
import Title from "./Title";
import NOTFOUND_ICON from "../../../../../public/images/Not_found_icon.svg";

import { StockType } from "../page";
import BodyFont from "@/common/BodyFont";
import StockItem from "./StockItem";

export default async function StockList({
  stocks,
  title,
}: {
  stocks: StockType[];
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
                <ul className="flex flex-col">
                  {stocks?.map((stock, index) => (
                    <li key={index} className="py-2">
                      <StockItem {...stock} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardWrap>
        </div>
      </div>
    </>
  );
}
