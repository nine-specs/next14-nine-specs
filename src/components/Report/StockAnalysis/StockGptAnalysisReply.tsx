import BodyFont from "@/common/BodyFont";
import { userMessageForPrompt } from "@/constants/Analysis/StockAnalysis";
import { getLlamaReply } from "@/service/report/llamaReplyApi";
import { getLlamaToken } from "@/service/report/llamaTokenApi";
import { StockInfo } from "../type/report/stockType";

interface Props {
  stockInfo: StockInfo | undefined;
}

export default async function StockGptAnalysisReply({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const token = await getLlamaToken();
  const message = await userMessageForPrompt(stockInfo);
  const res = await getLlamaReply({
    token: token,
    userMessage: message,
    temperature: 0.5,
    topP: 0.5,
    stream: false,
  });
  return (
    <div className="overflow-hidden hover:overflow-y-scroll h-[96px] ">
      <div className="w-[670px] h-full">
        <BodyFont level="4" weight="medium">
          {res}
        </BodyFont>
      </div>
    </div>
  );
}
