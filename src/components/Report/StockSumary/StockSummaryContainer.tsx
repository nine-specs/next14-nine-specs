import { Suspense } from "react";
import StockSummary from "./StockSummary";
import { StockInfo } from "../type/report/stockType";
import StockSummarySkeleton from "./StockSummarySkeleton";

interface Props {
  stockInfo: StockInfo | undefined;
}

export default function StockSumaryContainer({ stockInfo }: Props) {
  return (
    <Suspense fallback={<StockSummarySkeleton />}>
      <StockSummary stockInfo={stockInfo} />
    </Suspense>
  );
}
