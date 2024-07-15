import { getLlamaToken } from "@/service/report/llamaTokenApi";
import StockPolarChart from "../StockReport/StockPolarChart";
import StockReportList from "../StockReport/StockReportList";
import { getLlamaReply } from "@/service/report/llamaReplyApi";
import { reportPrompt } from "@/constants/Report/ReportPrompt";
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

const fetchFavoriteData = async (code: string) => {
  if (!code) return null;
  const token = await getLlamaToken();
  const res = await getLlamaReply({
    token: token,
    userMessage: reportPrompt(code),
    temperature: 0.1,
    topP: 0.1,
    stream: false,
  });
  const parsedRes = JSON.parse(res);
  const { scores } = parsedRes;
  return scores;
};

interface Props {
  code: string;
}

export default async function FavorStockReport({ code }: Props) {
  const parsedRes = await fetchFavoriteData(code);
  return <StockReport scores={parsedRes} />;
}
