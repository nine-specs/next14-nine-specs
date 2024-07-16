"use cleint";
import React, { Suspense } from "react";
import StockSubRate from "../ReportCommon/StockSubRate";
import StockLogoImage from "../ReportCommon/StockLogoImage";
import BodyFont from "@/common/BodyFont";
import { getStockDetails } from "@/service/report/stockDetailsApi";
import { StockInfo } from "../type/report/stockType";
import dynamic from "next/dynamic";
import { StockReport } from "./FavorStockReport";
import CardWrap from "@/common/CardWrap";
const FavorStockReport = dynamic(() => import("./FavorStockReport"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse h-full ">
      <StockReport />
    </div>
  ),
});
interface Props {
  stockInfo: StockInfo | undefined;
  children?: React.ReactNode;
  
}
export default async function FavorStockItem({ stockInfo, children }: Props) {
  if (!stockInfo) return null;
  const { name, code, ticker } = stockInfo;
  const stockInfomation = await getStockDetails(code);
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    stockInfomation;

  return (
    <div  className="flex flex-col" >
      <article className="flex flex-col justify-between w-full h-full gap-4 ">
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
            <div className="flex gap-2">
              <StockSubRate
                changeRate={compareToPreviousClosePrice}
                fluctuation={fluctuationsRatio}
                level="4"
              />
            </div>
          </div>
        </div>
        {/* 차트와 리포트 */}

        <FavorStockReport code={code} />
      </article>
      {children}
    </div>
  );
}
