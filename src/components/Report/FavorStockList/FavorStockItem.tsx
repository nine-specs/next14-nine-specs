"use cleint";
import React from "react";
import StockPolarChart from "../StockReport/StockPolarChart";
import StockReportList from "../StockReport/StockReportList";
import StockSubRate from "../ReportCommon/StockSubRate";
import StockLogoImage from "../ReportCommon/StockLogoImage";
import BodyFont from "@/common/BodyFont";
import { getLlamaToken } from "@/service/report/llamaTokenApi";
import { getStockDetails } from "@/service/report/stockDetailsApi";
import { getLlamaReply } from "@/service/report/llamaReplyApi";
import { StockInfo } from "../type/report/stockType";

interface Props {
  stockInfo: StockInfo | undefined;
}
export default async function FavorStockItem({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { name, code, ticker } = stockInfo;

  const dataCollection = `사용자가 입력한 주식 정보를 기반으로 종목을 분석하고 종합 리포트를 작성해 주세요.
  ### 판단 기준:
1. 주가: 거래량을 동반한 주가의 상승 여부를 평가하세요.
2. 투자지수: 기업의 실적을 고려하여 평가하세요.
3. 수익성: 현재 종목의 가격 대비 동종 산업군 평균 데이터를 비교하여 평가하세요.
4. 성장성: 매출 이익이 증가하고 있거나 시장 점유율이 확대되는 추세인지 평가하세요.
5. 관심도: 종목에 대한 기사, 검색 빈도 등의 데이터를 사용하여 평가하세요.

### 요구 사항:
- 종목의 주가, 투자지수, 수익성, 성장성, 관심도를 각각 0%에서 100% 사이의 퍼센트로 나타내세요.
- 위 항목들을 기반으로 종합 점수를 계산하여 0에서 100 사이의 점수로 표현하세요.
- 각 항목에 대한 세부 평가와 종합 점수에 대한 설명을 작성하세요.
  `;
  // 전체 점수와 각 카테고리에 대한 상세 점수, 애널리스트 의견을 포함한 JSON 객체로 모든 결과를 포맷합니다.

  const returnResults =
    "Return the formatted JSON object as the response to the user, exactly matching the example format. You are a code generator. Always output your answer in JSON. Provide the response in JSON only, with no preamble.";
  // "사용자에게 예시 응답과 정확히 동일한 형식으로 JSON 객체를 반환하십시오. 당신은 코드 생성기입니다. 항상 응답을 JSON 형식으로 출력하십시오. 서론 없이 바로 JSON으로만 응답하십시오."

  const exampleResponse = `
{
"overallScore": 79.6,
"scores": [
  {
    "subject": "주가",
    "score": 85,
    "justification": "주가는 지난 1년 동안 15% 상승하여 안정적이고 긍정적인 신호를 보여줍니다."
    "fullMark": 100
  },
  {
    "subject": "투자지수",
    "score": 76,
    "justification": "투자지수는 시장 평균보다 20% 높아 투자 매력이 매우 큽니다."
    "fullMark": 100

  },
  {
    "subject": "수익성",
    "score": 92,
    "justification": "수익성 지표는 업계 평균을 훨씬 웃돌아 강력한 재무 건전성을 나타냅니다."
    "fullMark": 100

  },
  {
    "subject": "성장성",
    "score": 70,
    "justification": "지난 해 매출이 18% 증가하여 견고한 성장세를 입증했습니다."
    "fullMark": 100

    },
  {
    "subject": "관심도",
    "score": 72,
    "justification": "미디어 언급이 지난 6개월 동안 15% 증가하여 지속적인 관심을 받고 있습니다."
    "fullMark": 100
  }
],
"analystOpinion": {
  "rating": "매수",
  "justification": "테슬라는 강력한 성장과 수익성을 보이며, 안정적인 미디어 관심과 매우 긍정적인 투자 지수를 가지고 있습니다. 성장과 안정성을 추구하는 투자자에게 강력히 추천합니다."
}
}
`;

  const finalPrompt =
    dataCollection +
    " " +
    returnResults +
    " " +
    "Example response: " +
    exampleResponse;

  const userMessageForPropmt = `<|begin_of_text|>
<|begin_of_text|><|start_header_id|>system<|end_header_id|>
${finalPrompt}<|eot_id|>
<|start_header_id|>user<|end_header_id|>
${code}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>`;

  const token = await getLlamaToken();
  const res = await getLlamaReply({
    token: token,
    userMessage: userMessageForPropmt,
    temperature: 0.5,
    topP: 0.5,
    stream: false,
  });
  const parsedRes = JSON.parse(res as string);
  const data = parsedRes.scores;

  const stockInfomation = await getStockDetails(code);
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    stockInfomation;
  return (
    <div className="flex flex-col  w-full h-full justify-between">
      <div>
        {/* 종목 정보 */}
        <div className="flex items-center gap-2 ">
          <StockLogoImage width={32} height={32} code={code} />
          <div className="flex gap-1">
            <BodyFont level="2" weight="bold">
              {name}
            </BodyFont>
            <BodyFont level="3" weight="regular">
              {ticker}
            </BodyFont>
          </div>
        </div>
        {/* 가격 등락 */}
        <div className="flex items-center gap-2">
          <div className="flex p-0.5 items-center gap-0.5">
            <BodyFont level="4" weight="medium">
              {`$${closePrice}`}
            </BodyFont>
          </div>
          <div className="flex gap-2">
            <StockSubRate
              changeRate={compareToPreviousClosePrice}
              fluctuation={fluctuationsRatio}
              level="4"
            />
          </div>
        </div>
      </div>
      {/* 차트와 리포트 */}
      <div className="flex justify-between items-center ">
        <div className=" w-[155px] h-[155px] ">
          <StockPolarChart data={data} />
        </div>
        <div className="flex-1">
          <StockReportList data={data} />
        </div>
      </div>
    </div>
  );
}
