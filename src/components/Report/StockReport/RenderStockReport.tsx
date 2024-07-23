import HeadingFont from "@/common/HeadingFont";
import { StockReport } from "../type/report/stockType";
import StockPolarChart from "./StockPolarChart";
import StockReportList from "./StockReportList";

export const RenderStockReport = ({
  overallScore = 0,
  scores = [
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
}: StockReport) => (
  <section className=" space-y-6">
    <div className="flex justify-end">
      <HeadingFont level="3" weight="medium" className="text-grayscale-700">
        {overallScore}점
      </HeadingFont>
    </div>
    <div className="relative">
      <div className="absolute left-0 w-[210px] h-[175px] z-10">
        <StockPolarChart dataKey="subject" valueKey="score" data={scores} cx="45%" viewAxis={true} />
      </div>
      <div className="absolute right-0">
        <StockReportList data={scores} />
      </div>
    </div>
  </section>
);
