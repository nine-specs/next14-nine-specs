import { Suspense } from "react";
import StockAnalysis from "./StockAnalysis";

export default function StockAnalysisContainer({ stockInfo }: any) {
  return (
    <Suspense fallback={<div>주식 애널리스트 로딩중... </div>}>
      <StockAnalysis stockInfo={stockInfo} />
    </Suspense>
  );
}
