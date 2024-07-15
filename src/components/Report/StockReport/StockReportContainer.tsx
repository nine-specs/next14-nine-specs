import BodyFont from "@/common/BodyFont";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { RenderStockReport } from "./StockReport";
import StockPolarChart from "./StockPolarChart";

const StockReport = dynamic(() => import("./StockReport"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse h-full ">
      <RenderStockReport />
    </div>
  ),
});
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
      <StockReport code={code} />
    </div>
  );
}
