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

const fetchStockGptReply = async (code: string) => {
  const system = `
  당신은 주식 분석 알고리즘을 개발하고 있습니다. 사용자가 입력한 주식 정보와 최근 6개월의 주식 데이터를 제공합니다. 주식의 투자 가치를 평가하는 프로그램을 작성해야 합니다. 주식의 투자 가치는 주가, 투자지수, 수익성, 성장성, 관심도 등 다양한 요소를 고려하여 평가합니다. 각 요소에 대한 점수는 0에서 100까지 부여되며, 해당 종합 점수의 평균을 계산하여 적용합니다.
  결과를 JSON 형식으로 사용자에게 반환하세요. 반드시 예제 형식에 맞게 JSON으로만 응답하세요. JSON 형식 이외의 내용을 포함하지 마세요
  `;

  const message = await reportPrompt(code);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/gpt`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system,
        message,
      }),
      cache: "no-store",
    },
  );
  const responseMessage = await res.json(); // 응답 데이타가 ```json ``` 하고 시작하는 문자열이라서 json으로 변환하기 위해 문자열로 받아옴
  const jsonStart = responseMessage.indexOf("{");
  const jsonEnd = responseMessage.lastIndexOf("}") + 1;
  const jsonString = responseMessage.substring(jsonStart, jsonEnd);
  const data = JSON.parse(jsonString);
  return data;
};
export default async function StockReport({ code }: Props) {
  if (!code) return null;
  // const { overallScore, scores } = await fetchStockReport(code);
  const responseMessage = await fetchStockGptReply(code);
  const { overallScore, scores } = responseMessage;
  return <RenderStockReport scores={scores} overallScore={overallScore} />;
}
