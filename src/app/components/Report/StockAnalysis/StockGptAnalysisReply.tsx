import BodyFont from "@/common/BodyFont";
import { gptReplyApi } from "@/service/report/gptReplyApi";
import { gptTokenApi } from "@/service/report/gptTokenApi";

interface Props {
  ticker: string;
}

export default async function StockGptAnalysisReply({ ticker }: Props) {
  const prompt = `
  당신은 주식 전문가입니다. 시장 트렌드에 민감하며 전문적인 통찰력을 가지고 있습니다. 오늘 날짜를 기준으로 사용자의 입력에 text 형식으로 응답하세요.
   당신의 응답은 기업 분석을 기반으로 한 애널리스트 의견을 내는 것입니다. 사용자가 제공한 티커에 대한 산업 평균 데이터와 주식 데이터를 수집하여 종합 의견을 작성하세요. 띄어쓰기는 쓰지 말고 이어서 답변 하세요. 답변은 한글 입니다.
  `;

  const userMessageForPropmt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
  ${prompt}<|eot_id|>

  <|start_header_id|>user<|end_header_id|>
  ${ticker}<|eot_id|>
  <|start_header_id|>assistant<|end_header_id|>`;

  const token = await gptTokenApi();
  const res = await gptReplyApi({
    token: token,
    userMessage: userMessageForPropmt,
    temperature: 0.5,
    topP: 0.5,
    stream: false,
  });
  console.log(res);
  return (
    <div className="overflow-hidden hover:overflow-y-scroll h-[96px]">
      <div className="w-[670px]">
        <BodyFont level="4" weight="medium" >
          {res}
        </BodyFont>
      </div>
    </div>
  );
}
