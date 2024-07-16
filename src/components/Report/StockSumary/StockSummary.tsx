import BodyFont from "@/common/BodyFont";
import StockExchage from "./StockExchage";
import { getStockDetails } from "@/service/report/stockDetailsApi";
import { getStockSummary } from "@/service/report/stockSummaryApi";
import { getExchangeRate } from "@/service/report/exchangeRateApi";

interface Props {
  code: string;
  ticker: string;
}

export default async function StockSummary({ code, ticker }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/summary`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
      cache: "no-store",
    },
  );

  const {
    exchangeRate,
    closePrice,
    fluctuationsRatio,
    compareToPreviousClosePrice,
    convertContent,
  } = await res.json();

  return (
    <div className="flex flex-col justify-between gap-6 ">
      {/* 원달라 환율  */}
      <StockExchage
        price={closePrice}
        ticker={ticker}
        fluctuation={fluctuationsRatio}
        exchangeRate={exchangeRate}
        changeRate={compareToPreviousClosePrice}
      />
      {/* 주식 설명 */}
      <div className="  h-[100px] overflow-hidden hover:overflow-y-scroll ">
        <div className="w-[400px]">
          <BodyFont level="4" weight="regular">
            {convertContent}
          </BodyFont>
        </div>
      </div>
    </div>
  );
}
