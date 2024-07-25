"use client";

import BodyFont from "@/common/BodyFont";
import { BASE_URL } from "@/constants";

import Image from "next/image";
import { StockInfo } from "@/components/Report/type/report/stockType";
import StockUpDown from "../../../../common/StockItem/StockUpDown";
import { useEffect, useState } from "react";

/**
 * 주식 종목 아이템
 */
export default function RecentlyViewedStockItem(props: StockInfo) {
  const { ticker, code, name } = props;
  const [data, setData] = useState<{
    closePrice: string;
    fluctuationsRatio: string;
    compareToPreviousClosePrice: string;
  }>();

  useEffect(() => {
    const loadData = async () => {
      const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } = await (
        await fetch(`${BASE_URL}/api/report/price`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        })
      ).json();

      setData({ closePrice, fluctuationsRatio, compareToPreviousClosePrice });
    };
    loadData();
  }, [code]);

  if (!data) return <div className="animate-pulse h-full w-full bg-white"></div>;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${code}.svg`}
            alt={name}
            width={64}
            height={64}
            className="h-auto"
          />
          <div>
            <BodyFont level="2" weight="bold">
              {name}
            </BodyFont>
            <BodyFont level="5" weight="regular">
              {ticker}
            </BodyFont>
          </div>
        </div>
        <div className="text-right">
          <BodyFont level="3" weight="medium">
            ${data?.closePrice}
          </BodyFont>
          <StockUpDown size="4" changeRate={data?.compareToPreviousClosePrice} fluctuation={data?.fluctuationsRatio} />
        </div>
      </div>
    </>
  );
}
