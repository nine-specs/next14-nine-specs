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
  const { overallScore, scores } = JSON.parse(res);
  console.log(JSON.parse(res));

  return (
    <section className="space-y-6">
      <div className="flex justify-end ">
        <HeadingFont level="3" weight="medium" className="text-grayscale-700">
          {overallScore}점
        </HeadingFont>
      </div>

      <div className="relative ">
        <div className="absolute left-0 w-[210px] h-[175px] z-10">
          <StockPolarChart data={scores} cx="45%" viewAxis={true} />
        </div>
        <div className="absolute right-0">
          <StockReportList data={scores} />
        </div>
      </div>
    </section>
  );
}
