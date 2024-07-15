"use cleint";
import StockReportList from "./StockReportList";
import HeadingFont from "@/common/HeadingFont";
import { getLlamaToken } from "@/service/report/llamaTokenApi";
import { getLlamaReply } from "@/service/report/llamaReplyApi";
import { reportPrompt } from "@/constants/Report/ReportPrompt";
import type { StockReport } from "../type/report/stockType";
import StockPolarChart from "./StockPolarChart";

interface Props {
  code?: string;
}

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
        <StockPolarChart
          dataKey="subject"
          valueKey="score"
          data={scores}
          cx="45%"
          viewAxis={true}
        />
      </div>
      <div className="absolute right-0">
        <StockReportList data={scores} />
      </div>
    </div>
  </section>
);

const fetchStockReport = async (code: string) => {
  const token = await getLlamaToken();
  const res = await getLlamaReply({
    token: token,
    userMessage: reportPrompt(code),
    temperature: 0.1,
    topP: 0.1,
    stream: false,
  });
  return JSON.parse(res);
};
export default async function StockReport({ code }: Props) {
  if (!code) return null;
  const { overallScore, scores } = await fetchStockReport(code);

  return <RenderStockReport scores={scores} overallScore={overallScore} />;
}
