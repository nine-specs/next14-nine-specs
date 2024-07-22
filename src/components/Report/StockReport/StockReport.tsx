"use cleint";
import StockReportList from "./StockReportList";
import HeadingFont from "@/common/HeadingFont";
import type { StockReport } from "../type/report/stockType";
import StockPolarChart from "./StockPolarChart";
import { reportPrompt } from "@/constants/Report/ReportPrompt";

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

const fetchStockGptReply = async (code: string) => {
  const { system, message } = await reportPrompt(code);
  console.log(system, message);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gpt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system,
      message,
    }),
    cache: "no-store",
  });
  const responseMessage = await res.json(); // 응답 데이타가 ```json ``` 하고 시작하는 문자열이라서 json으로 변환하기 위해 문자열로 받아옴
  const jsonStart = responseMessage.indexOf("{");
  const jsonEnd = responseMessage.lastIndexOf("}") + 1;
  const jsonString = responseMessage.substring(jsonStart, jsonEnd);
  const data = JSON.parse(jsonString);
  return data;
};
interface Props {
  code: string;
}
export default async function StockReport({ code }: Props) {
  if (!code) return null;
  const responseMessage = await fetchStockGptReply(code);
  const { overallScore, scores } = responseMessage;
  return <RenderStockReport scores={scores} overallScore={overallScore} />;
}
