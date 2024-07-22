import StockPolarChart from "../StockReport/StockPolarChart";
import StockReportList from "../StockReport/StockReportList";
import { StockReportScore } from "../type/report/stockType";
import { fetchReportGptReply } from "@/service/report/fetchReportGptReply";

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

interface Props {
  code: string;
}

export default async function FavorStockReport({ code }: Props) {
  const responseMessage = await fetchReportGptReply(code);
  const { scores } = responseMessage;
  return <StockReport scores={scores} />;
}
