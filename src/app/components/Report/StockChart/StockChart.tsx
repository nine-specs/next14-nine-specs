import BodyFont from "@/common/BodyFont";
import { stockPriceApi } from "@/service/report/stockPriceApi";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const StockAreaChart = dynamic(() => import("../StockChart/StockAreaChart"), {
  ssr: false,
  loading: () => (
    <BodyFont level="1" weight="bold">
      주가 차트
    </BodyFont>
  ),
});
interface Props {
  code?: string;
}

// 주식 차트 컴포넌트
export default async function StockChart({ code = "NASDAQ" }: Props) {
  // 1년치 데이타의 경우 주단위로 데이타를 가져옴
  const yearData = await stockPriceApi(code, "year&range=10", "NASDAQ");
  const dayData = await stockPriceApi(code, "dayCandle", "NASDAQ");

  return (
    <>
      <Suspense
        fallback={
          <BodyFont level="1" weight="bold">
            차트 불러오는 중
          </BodyFont>
        }
      >
        {/* {JSON.stringify(stockPriceDayData)} */}
        <StockAreaChart yearData={yearData} dayData={dayData} />
      </Suspense>
    </>
  );
}
