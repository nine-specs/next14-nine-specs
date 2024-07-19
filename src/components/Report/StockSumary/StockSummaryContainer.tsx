import { Suspense } from "react";
import StockSummary from "./StockSummary";
import StockSuspenseLoading from "../ReportCommon/SuspenseLoading";
import { StockInfo } from "../type/report/stockType";

interface Props {
  stockInfo: StockInfo | undefined;
}

export default function StockSumaryContainer({ stockInfo }: Props) {
  return (
    <Suspense fallback={<StockSuspenseLoading />}>
      <StockSummary stockInfo={stockInfo} />
    </Suspense>
  );
}
