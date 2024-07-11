import { Suspense } from "react";
import StockAnalysis from "./StockAnalysis";
import { StockInfo } from "../type/report/stockType";

interface Props {
  stockInfo: StockInfo;
}

export default function StockAnalysisContainer({ stockInfo }: Props) {
  return (
    <Suspense fallback={<div>주식 애널리스트 로딩중... </div>}>
      <StockAnalysis stockInfo={stockInfo} />
    </Suspense>
  );
}
