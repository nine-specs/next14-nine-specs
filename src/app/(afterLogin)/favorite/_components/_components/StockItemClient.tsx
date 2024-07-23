"use client";
import BodyFont from "@/common/BodyFont";
import { BASE_URL } from "@/constants";
import Image from "next/image";
import { StockInfo } from "@/components/Report/type/report/stockType";
import StockUpDown from "@/common/StockItem/StockUpDown";
import { useEffect, useState } from "react";

type StockItemProps = StockInfo & {
  size: "sm" | "md" | "lg";
};

const sizeVariants: {
  [key in "sm" | "md" | "lg"]: {
    icon: number;
    name: "2" | "4";
    closePrice?: "3" | "4";
    stockUpDown: "4" | "5";
  };
} = {
  sm: {
    icon: 32,
    name: "4",
    stockUpDown: "5",
  },
  md: {
    icon: 48,
    name: "4",
    closePrice: "4",
    stockUpDown: "5",
  },
  lg: {
    icon: 64,
    name: "2",
    closePrice: "3",
    stockUpDown: "4",
  },
};

/**
 * 주식 종목 아이템
 */
export default function StockItemClient(props: StockItemProps) {
  const { ticker, code, name, size } = props;
  const [stockData, setStockData] = useState<{
    closePrice: any;
    fluctuationsRatio: any;
    compareToPreviousClosePrice: any;
  } | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/report/price`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
    };

    fetchStockData();
  }, [code]);

  const isSmall = size === "sm";

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${code}.svg`}
            alt={name}
            width={sizeVariants[size].icon}
            height={sizeVariants[size].icon}
            className="h-auto"
          />
          <div>
            <BodyFont
              level={sizeVariants[size].name}
              weight="bold"
              className={isSmall ? "text-grayscale-600 font-medium" : ""}
            >
              {name}
            </BodyFont>
            {isSmall || (
              <BodyFont level="5" weight="regular">
                {ticker}
              </BodyFont>
            )}
          </div>
        </div>
        <div className="text-right">
          {sizeVariants[size].closePrice && (
            <BodyFont level={sizeVariants[size].closePrice} weight="medium">
              ${stockData?.closePrice}
            </BodyFont>
          )}
          <StockUpDown
            size={sizeVariants[size].stockUpDown}
            changeRate={stockData?.compareToPreviousClosePrice}
            fluctuation={stockData?.fluctuationsRatio}
          />
        </div>
      </div>
    </>
  );
}
