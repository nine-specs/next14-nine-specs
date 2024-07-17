import BodyFont from "@/common/BodyFont";
import { StockInfo } from "../type/report/stockType";
import { gptAnalysisPrompt } from "@/constants/Analysis/gptAnalysis";

interface Props {
  stockInfo: StockInfo | undefined;
}

export default async function StockGptAnalysisReply({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { code } = stockInfo;
  const system =
    "당신은 유능한 투자 전문가다 당신의 투자는 과거 주식 시세 데이터를 바탕으로 철저한 분석을 통해 답변합니다. 최대 응답 글자는 500 자 미만으로 답하여라. 응답데이타는 text 데이타 입니다";
  const message = await gptAnalysisPrompt(code);
  const getFetch = await fetch(
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

  const data = await getFetch.json();
  console.log(data);
  return (
    <div className="overflow-hidden hover:overflow-y-scroll h-[100px] border border-transparent hover:border-gray-500">
      <div className="w-[670px] h-full p-2">
        <BodyFont level="4" weight="medium">
          {data}
        </BodyFont>
      </div>
    </div>
  );
}
