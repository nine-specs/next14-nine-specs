import { Suspense } from "react";
import StockSummary from "./StockSummary";
import StockSubRate from "../ReportCommon/StockSubRate";

interface Props {
  code: string;
  ticker: string;
}

export default function StockSumaryContainer({ code, ticker }: Props) {
  return (
    <>
      <Suspense fallback={<div>주식 가격 , 요약 로딩중...</div>}>
        <StockSummary code={code} ticker={ticker} />
      </Suspense>
    </>
  );
}
