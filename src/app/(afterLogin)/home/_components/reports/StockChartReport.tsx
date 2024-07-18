import { reportPrompt } from "@/constants/Report/ReportPrompt";
import fetchAiReply from "@/service/fetchAiReply";

import StockReport from "./StockReport";
import StockPolarChart from "@/components/Report/StockReport/StockPolarChart";

export default async function StockChartReport({ code }: { code: string }) {
  const response = await fetchAiReply({
    prompt: reportPrompt(code),
  });
  const { scores } = JSON.parse(response);

  return (
    <div className="flex items-center justify-between">
      <div className="w-[150px] h-[150px]">
        <StockPolarChart data={scores} PorlarAngle={false} />
      </div>
      <div className="w-[168px] h-[168px]">
        <StockReport data={scores} />
      </div>
    </div>
  );
}
