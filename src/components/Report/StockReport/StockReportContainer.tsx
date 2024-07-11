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
  const { scores, overallScore } = {
    scores: [
      {
        subject: "주가",
        score: 0,
        fullMark: 100,
      },
      {
        subject: "투자지수",
        score: 0,
        fullMark: 100,
      },
      {
        subject: "수익성",
        score: 0,
        fullMark: 100,
      },
      {
        subject: "성장성",
        score: 0,
        fullMark: 100,
      },
      {
        subject: "관심도",
        score: 0,
        fullMark: 100,
      },
    ],
    overallScore: 83.5,
  };
  return (
    <div className="relative h-full">
      <div className="absolute ">
        <BodyFont level="1" weight="bold">
          종목 AI 리포트
        </BodyFont>
      </div>
      <Suspense
        fallback={
          <>
            <section className="space-y-6 ">
              <div className="flex justify-end items-center gap-1">
                <StockSuspenseLoading />
                <HeadingFont
                  level="3"
                  weight="medium"
                  className="text-grayscale-700"
                >
                  점
                </HeadingFont>
              </div>

              <div className="relative animate-pulse ">
                <div className="absolute left-0 w-[210px] h-[175px] z-10">
                  <StockPolarChart data={scores} cx="45%" viewAxis={true} />
                </div>
                <div className="absolute right-0">
                  <StockReportList data={scores} />
                </div>
              </div>
            </section>{" "}
          </>
        }
      >
        <StockReport code={code} />
      </Suspense>
    </div>
  );
}
