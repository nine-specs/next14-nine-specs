"use client";

import BodyFont from "@/common/BodyFont";
import React, { useMemo, useState } from "react";
import StockSubRate from "../ReportCommon/StockSubRate";

interface Props {
  price: string;
  ticker: string;
  fluctuation: string;
  changeRate: string;
  exchangeRate: string;
}

export default function StockExchage({
  price,
  ticker,
  fluctuation,
  changeRate,
  exchangeRate,
}: Props) {
  const [exchange, setExchange] = useState(true);

  const handleExchange = () => {
    setExchange((prev) => !prev);
  };

  const numericPrice = (price: string) => Number(price.replace(/,/g, ""));

  // 환율 적용 원회 가격
  const convertedPrice = (
    numericPrice(price) * numericPrice(exchangeRate)
  ).toLocaleString("ko-KR", {
    maximumFractionDigits: 0,
  });

  return (
    <article>
      <div className="flex justify-between items-center">
        {/* 가격 정보 */}
        <div className="flex p-0.5 items-center gap-0.5">
          <BodyFont level="1" weight="bold">
            {exchange ? `$${price}` : `₩${convertedPrice}`}
          </BodyFont>
          <BodyFont level="2" weight="regular">
            ∙
          </BodyFont>
          <BodyFont level="2" weight="regular">
            {ticker}
          </BodyFont>
        </div>
        {/* 원 달라 변경 버튼 */}
        <div className="bg-grayscale-200 flex w-[76px] h-[40px] justify-around items-center rounded">
          <button
            onClick={handleExchange}
            className={`w-[32px] h-[32px] rounded ${
              exchange ? "bg-white" : "text-grayscale-400"
            } p-auto text-center`}
          >
            <BodyFont level="2" weight="bold">
              $
            </BodyFont>
          </button>
          <button
            onClick={handleExchange}
            className={`w-[32px] h-[32px] rounded ${
              !exchange ? "bg-white" : "text-grayscale-400"
            } p-auto text-center`}
          >
            <BodyFont level="2" weight="medium">
              원
            </BodyFont>
          </button>
        </div>
      </div>
      {/* 등락 */}
      <StockSubRate
        className="gap-2"
        fluctuation={fluctuation}
        changeRate={changeRate}
      />
    </article>
  );
}
