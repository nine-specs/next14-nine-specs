import BodyFont from "@/common/BodyFont";
import React, { Suspense } from "react";
import StockReport from "./StockReport";
interface Props {
  code: string;
}

export default function StockReportContainer({ code }: Props) {
  return (
    <div className="relative">
      <div className="absolute top-0">
        <BodyFont level="1" weight="bold">
          종목 AI 리포트
        </BodyFont>
      </div>
      <Suspense
        fallback={
          <>
            <BodyFont level="1" weight="bold">
              종목 AI 리포트
            </BodyFont>
            <BodyFont level="5" weight="bold">
              차트 불러오는 중...
            </BodyFont>
          </>
        }
      >
        <StockReport code={code} />
      </Suspense>
    </div>
  );
}
