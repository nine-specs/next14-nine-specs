"use cleint";
import React, { Suspense } from "react";
import StockSubRate from "../ReportCommon/StockSubRate";
import StockLogoImage from "../ReportCommon/StockLogoImage";
import BodyFont from "@/common/BodyFont";
import { getStockDetails } from "@/service/report/stockDetailsApi";
import { StockInfo } from "../type/report/stockType";
import FavorStockReport from "./FavorStockReport";
import StockPolarChart from "../StockReport/StockPolarChart";
import StockReportList from "../StockReport/StockReportList";

interface Props {
  stockInfo: StockInfo | undefined;
}
export default async function FavorStockItem({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { name, code, ticker } = stockInfo;
  const stockInfomation = await getStockDetails(code);
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    stockInfomation;
  const { scores } = {
    scores: [
      {
        subject: "주가",
        score: 0,
        fullMark: 100,
      },
      {
        subject: "투자지수",
        score: 0,
        fullMark: 100,
      },
      {
        subject: "수익성",
        score: 0,
        fullMark: 100,
      },
      {
        subject: "성장성",
        score: 0,
        fullMark: 100,
      },
      {
        subject: "관심도",
        score: 0,
        fullMark: 100,
      },
    ],
  };
  return (
    <article className="flex flex-col justify-between w-full h-full ">
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
      <Suspense
        fallback={
          <div className="flex justify-between items-center animate-pulse ">
            <div className=" w-[155px] h-[155px] ">
              <StockPolarChart data={scores} />
            </div>
            <div className="flex-1">
              <StockReportList data={scores} />
            </div>
          </div>
        }
      >
        <FavorStockReport code={code} />
      </Suspense>
    </article>
  );
}
