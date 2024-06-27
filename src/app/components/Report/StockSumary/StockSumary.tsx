"use client";
import BodyFont from "@/common/BodyFont";
import { useEffect, useState } from "react";
import { exchangeApi } from "@/service/report/exchangeApi";
import StockSubRate from "../ReportCommon/StockSubRate";

interface StockSumaryProps {
  price?: string;
  ticker?: string;
  content?: string;
  fluctuation?: number;
  changeRate?: number;
  exchangeRate?: string;
}

export default function StockSumary({
  price = "100000",
  ticker = "AAPL",
  content = "애플은 스마트폰, 개인용 컴퓨터, 태블릿, 웨어러블 및 액세서리를 설계, 제조 및 판매하고 다양한 관련 서비스를 판매한다. 제품 카테고리는 iPhone, MAc, iPad, Wearables, Home 및 Accessories로 나뉜다.",
  fluctuation = 0.5,
  changeRate = -0.5,
  exchangeRate = "1,200.00",
}: StockSumaryProps) {
  const [exchange, setExchange] = useState(true);

  const handleExchange = () => {
    setExchange((prev) => !prev);
  };
  const convertedPrice = (Number(price) / Number(exchangeRate)).toFixed(2);

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center">
        {/* 가격 정보 */}
        <div className="flex p-0.5 items-center gap-0.5">
          <BodyFont level="1" weight="bold">
            {exchange ? "$" : "₩"}
            {exchange ? `${convertedPrice}` : `${price}`}
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
      <div className="flex gap-2">
        <StockSubRate fluctuation={fluctuation} changeRate={changeRate} />
      </div>
      {/* 주식 설명 */}
      <div className="line-clamp-4 mt-8">
        <BodyFont level="4" weight="regular">
          {content}
        </BodyFont>
      </div>
    </div>
  );
}
