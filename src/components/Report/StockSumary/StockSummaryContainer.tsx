import { Suspense } from "react";
import StockSummary from "./StockSummary";
import StockSuspenseLoading from "../ReportCommon/SuspenseLoading";

interface Props {
  code: string;
  ticker: string;
}

export default function StockSumaryContainer({ code, ticker }: Props) {
  return (
    <Suspense fallback={<StockSuspenseLoading />}>
      <StockSummary code={code} ticker={ticker} />
    </Suspense>
  );
}
