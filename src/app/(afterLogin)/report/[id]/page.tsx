import ReportContainer from "@/app/components/Report/ReportContainer";
import { gptReplyApi } from "@/service/report/gptReplyApi";
import { gptTokenApi } from "@/service/report/gptTokenApi";
import { stockPriceApi } from "@/service/report/stockPriceApi";

interface Props {
  params: {
    id: string;
  };
}
export default async function page({ params }: Props) {
  const { id } = params;

  // const priceData = await stockPriceApi("TSLA.O", "dayCandle", "NASDAQ");
  // console.log(priceData);

  const userMessageForPropmt = `<|begin_of_text|><|start_header_id|>user<|end_header_id|>
테슬라 주식 대한 요약을 한국어로 짧게 답변해줘<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>`;

  // <|begin_of_text|> : 프롬프트의  시작을 지정합니다.
  // <|start_header_id|>system<|end_header_id|> : 다음 메시지에 대한 역할을 지정합니다(예: "system")
  // 당신은 여행 팁과 추천을 해주는 유용한 AI 도우미입니다 . 시스템 메시지
  // <|eot_id|> : 입력 메시지의 끝을 지정합니다.
  // <|start_header_id|>user<|end_header_id|> : 다음 메시지에 대한 역할을 지정합니다(예: "user")
  // 무엇을 도와주실 수 있나요? : 사용자 메시지
  // <|start_header_id|>assistant<|end_header_id|> : 모델 생성을 시작하라는 메시지를 표시하기 위해 보조 헤더로 끝납니다.
  console.log("페이지 통신 시작");
  // const token = await gptTokenApi();
  // const res = await gptReplyApi({
  //   token: token,
  //   userMessage: userMessageForPropmt,
  //   temperature: 0.5,
  //   topP: 0.5,
  //   stream: false,
  // });
  // console.log("gpt 응답 데이타 ", res);
  return (
    <div>
      {/* <div>{JSON.stringify(res)}</div> */}
      <ReportContainer />
    </div>
  );
}
