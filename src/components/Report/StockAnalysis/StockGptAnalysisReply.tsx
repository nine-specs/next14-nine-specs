import BodyFont from "@/common/BodyFont";
import { userMessageForPrompt } from "@/constants/Analysis/StockAnalysis";
import { getLlamaReply } from "@/service/report/llamaReplyApi";
import { getLlamaToken } from "@/service/report/llamaTokenApi";

interface Props {
  ticker: string;
}

export default async function StockGptAnalysisReply({ ticker }: Props) {
  const token = await getLlamaToken();
  const res = await getLlamaReply({
    token: token,
    userMessage: userMessageForPrompt(ticker),
    temperature: 0.5,
    topP: 0.5,
    stream: false,
  });
  return (
    <div className="overflow-hidden hover:overflow-y-scroll h-[96px]">
      <div className="w-[670px] h-full">
        <BodyFont level="4" weight="medium">
          {res}
        </BodyFont>
      </div>
    </div>
  );
}
