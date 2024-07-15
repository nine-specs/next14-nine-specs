import BodyFont from "@/common/BodyFont";
import React, { Suspense } from "react";
import StockReport from "./StockReport";
import StockSuspenseLoading from "../ReportCommon/SuspenseLoading";
import HeadingFont from "@/common/HeadingFont";
import StockPolarChart from "./StockPolarChart";
import StockReportList from "./StockReportList";
interface Props {
  code: string;
}

export default function StockReportContainer({ code }: Props) {
  return (
    <div className="relative h-full">
      <div className="absolute ">
        <BodyFont level="1" weight="bold">
          종목 AI 리포트
        </BodyFont>
      </div>
      <Suspense fallback={<StockReport />}>
        <StockReport code={code} />
      </Suspense>
    </div>
  );
}
