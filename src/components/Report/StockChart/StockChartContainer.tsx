import BodyFont from "@/common/BodyFont";
import { Suspense } from "react";
import StockChartLoader from "./StockChartLoader";
import StockSuspenseLoading from "../ReportCommon/SuspenseLoading";
interface Props {
  code: string | undefined;
}
export default function StockChartContainer({ code }: Props) {
  return (
    <div className="relative w-full h-full">
      {/* 타이틀 */}
      <div className="absolute top-0">
        <BodyFont level="1" weight="bold">
          주가 차트
        </BodyFont>
      </div>
      {/* 차트 */}

      <Suspense
        fallback={
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <StockSuspenseLoading />
          </div>
        }
      >
        <StockChartLoader code={code} />
      </Suspense>
    </div>
  );
}
