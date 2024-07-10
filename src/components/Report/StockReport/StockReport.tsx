import BodyFont from "@/common/BodyFont";
import StockReportList from "./StockReportList";
import HeadingFont from "@/common/HeadingFont";
import dynamic from "next/dynamic";
import { getLlamaToken } from "@/service/report/llamaTokenApi";
import { getLlamaReply } from "@/service/report/llamaReplyApi";
import { reportPrompt } from "@/constants/Report/ReportPrompt";

const StockPolarChart = dynamic(() => import("./StockPolarChart"), {
  ssr: false, // Disable SSR for this component
  loading: () => null, // Component to render while loading
});
interface Props {
  code?: string;
}
export default async function StockReport({ code }: Props) {
  if (!code) return null;
  const token = await getLlamaToken();
  const res = await getLlamaReply({
    token: token,
    userMessage: reportPrompt(code),
    temperature: 0.5,
    topP: 0.5,
    stream: false,
  });
  const parsedRes = JSON.parse(res as string);
  const overallScore = parsedRes?.overallScore;
  const chartData = parsedRes.scores;
  return (
    <section className="space-y-6">
      <div className="flex justify-between ">
        <BodyFont level="1" weight="bold">
          종목 AI 리포트
        </BodyFont>
        <HeadingFont level="3" weight="medium" className="text-grayscale-700">
          {overallScore}점
        </HeadingFont>
      </div>

      <div className="flex justify-between ">
        <div className="w-[175px] h-[175px] overflow-visible">
          <StockPolarChart data={chartData} viewAxis={true} />
        </div>

        <StockReportList data={chartData} />
      </div>
    </section>
  );
}
