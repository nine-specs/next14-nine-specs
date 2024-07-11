import { getStockPrice } from "@/service/report/stockPriceApi";
import dayjs from "dayjs";

const dataCollection = `
당신은 주식 분석 알고리즘을 개발하고 있습니다. 사용자가 입력한 주식 정보와 최근 6개월의 주식 데이터를 제공합니다. 주식의 투자 가치를 평가하는 프로그램을 작성해야 합니다. 주식의 투자 가치는 주가, 투자지수, 수익성, 성장성, 관심도 등 다양한 요소를 고려하여 평가합니다. 각 요소에 대한 점수는 0에서 100까지 부여되며, 해당 종합 점수의 평균을 계산하여 적용합니다. 
아래는 해당 요소에 대한 설명입니다.
`;

const Price = `
주가의 거래량과 주가 상승 여부에 따라 0에서 100까지의 점수를 매기세요.
`;
const Investment = `
회사의 성과와 시장 조건을 고려하여 투자지수에 따라 0에서 100까지의 점수를 매기세요.
`;
const Profitability = `
현재 주식 가격을 동일 산업군의 평균 데이터와 비교하여 수익성에 따라 0에서 100까지의 점수를 매기세요.
`;
const Growth = `
매출 이익의 증가와 시장 점유율의 확대 같은 성장 지표를 바탕으로 0에서 100까지의 점수를 매기세요.
`;
const Interest = `
주식에 대한 관심도를 기사 발행 빈도와 검색 빈도 등의 데이터를 사용하여 0에서 100까지의 점수를 매기세요.
`;

const justification = `
각 요소에 대한 점수를 매길 때, 해당 요소에 대한 설명을 제공하세요.`;

const Result = `
해당 종합 점수의 평균을 계산하여 적용하세요
`;

const exampleResponse = `
{
  "scores": [
    {
      "subject": "주가",
      "score": ${Price},
      "justification": ${justification},
      "fullMark": 100
    },
    {
      "subject": "투자지수",
      "score": ${Investment},
      "justification": ${justification},
      "fullMark": 100
    },
    {
      "subject": "수익성",
      "score": ${Profitability},
      "justification": ${justification},
      "fullMark": 100
    },
    {
      "subject": "성장성",
      "score": ${Growth},
      "justification": ${justification},
      "fullMark": 100
    },
    {
      "subject": "관심도",
      "score": ${Interest},
      "justification": ${justification},
      "fullMark": 100
    }
  ],
  "overallScore": ${Result}
}
`;

const returnResults =
  "Return the formatted JSON object as the response to the user, exactly matching the example format. You are a code generator. Always output your answer in JSON. Provide the response in JSON only, with no preamble.";

const finalPrompt = dataCollection + exampleResponse + returnResults;

export const reportPrompt = (code: string) => {
  const today = dayjs().format("YYYY-MM-DD");
  const sixMonthsPrice = getStockPrice(code, "month", "NASDAQ");
  const fewTestCases = `
  주식 정보: ${code}
  오늘 날짜: ${today}
  최근 6개월의 주식 데이터 : ${sixMonthsPrice}
  
  `;
  return `<|begin_of_text|>
<|begin_of_text|><|start_header_id|>system<|end_header_id|>
${finalPrompt}<|eot_id|>
<|start_header_id|>user<|end_header_id|>
${code}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>`;
};
