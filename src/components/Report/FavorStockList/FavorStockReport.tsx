import { reportPrompt } from "@/constants/Report/ReportPrompt";
import StockPolarChart from "../StockReport/StockPolarChart";
import StockReportList from "../StockReport/StockReportList";
import { StockReportScore } from "../type/report/stockType";

interface StockReport {
  scores?: StockReportScore[];
}
export const StockReport = ({
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
}: StockReport) => {
  return (
    <div className="flex justify-between items-center ">
      <div className=" w-[155px] h-[155px] ">
        <StockPolarChart data={scores} />
      </div>
      <div className="flex-1">
        <StockReportList data={scores} />
      </div>
    </div>
  );
};

const fetchStockGptReply = async (code: string) => {
  const { system, message } = await reportPrompt(code);
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

export default async function FavorStockReport({ code }: Props) {
  const responseMessage = await fetchStockGptReply(code);
  const { scores } = responseMessage;
  return <StockReport scores={scores} />;
}
