import { getLlamaToken } from "@/service/report/llamaTokenApi";
import StockPolarChart from "../StockReport/StockPolarChart";
import StockReportList from "../StockReport/StockReportList";
import { getLlamaReply } from "@/service/report/llamaReplyApi";
import { reportPrompt } from "@/constants/Report/ReportPrompt";

interface Props {
  code: string;
}

export default async function FavorStockReport({ code }: Props) {
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
}
