import React from "react";
import StockLogoImage from "../ReportCommon/StockLogoImage";
import BodyFont from "@/common/BodyFont";
import { StockInfo } from "../type/report/stockType";
import StockSubRate from "../ReportCommon/StockSubRate";

interface Props {
  stockInfo: StockInfo | undefined;
}
export default async function FevorStockHeader({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { name, code, ticker } = stockInfo;
  const priceFetch = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/price`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
      cache: "no-store",
    },
  ); // 주식 가격의 정보 주식의 가격은 항시 변동되기 때문에 캐싱 없이 실시간으로 가져와야함
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    await priceFetch.json();
  return (
    <div>
      {/* 종목 정보 */}
      <div className="flex items-center gap-2 ">
        <StockLogoImage width={32} height={32} code={code} />
        <div className="flex gap-1">
          <BodyFont level="2" weight="bold">
            {name}
          </BodyFont>
          <BodyFont level="3" weight="regular">
            {ticker}
          </BodyFont>
        </div>
      </div>
      {/* 가격 등락 */}
      <div className="flex items-center gap-2">
        <div className="flex p-0.5 items-center gap-0.5">
          <BodyFont level="4" weight="medium">
            {`$${closePrice}`}
          </BodyFont>
        </div>
        <StockSubRate
          className="gap-2"
          changeRate={compareToPreviousClosePrice}
          fluctuation={fluctuationsRatio}
          level="4"
        />
      </div>
    </div>
  );
}
