import { getStockPrice } from "@/service/report/stockPriceApi";

const scoringCriteria = `
주가 (Price): 주가의 거래량과 주가 상승 여부에 따라 0에서 100까지의 점수를 매기세요.
투자지수 (Investment): 회사의 성과와 시장 조건을 고려하여 투자지수에 따라 0에서 100까지의 점수를 매기세요.
수익성 (Profitability): 현재 주식 가격을 동일 산업군의 평균 데이터와 비교하여 수익성에 따라 0에서 100까지의 점수를 매기세요.
성장성 (Growth): 매출 이익의 증가와 시장 점유율의 확대 같은 성장 지표를 바탕으로 0에서 100까지의 점수를 매기세요.
관심도 (Interest): 주식 거래량을 분석하여 관심도를 측정 0에서 100까지의 점수를 매기세요.
`;

const examplePrompt = `
예시 데이터 :
{
  "scores": [
    {
      "subject": "주가",
      "score": "점수를 입력하세요",
      "justification": "설명을 입력하세요",
      "fullMark": 100
    },
    {
      "subject": "투자지수",
      "score": "점수를 입력하세요",
      "justification": "설명을 입력하세요",
      "fullMark": 100
    },
    {
      "subject": "수익성",
      "score": "점수를 입력하세요",
      "justification": "설명을 입력하세요",
      "fullMark": 100
    },
    {
      "subject": "성장성",
      "score": "점수를 입력하세요",
      "justification": "설명을 입력하세요",
      "fullMark": 100
    },
    {
      "subject": "관심도",
      "score": "점수를 입력하세요",
      "justification": "설명을 입력하세요",
      "fullMark": 100
    }
  ],
  "overallScore": "종합 점수를 입력하세요"
  "analyst": "응답 데이터의 근거를 제시 , 현재 참고한 데이터의 날짜는 언제인지 ,조회한 종목, 현재 주식의 가격을 보여주고 해당 데이터의 근거 를 자세히 설명하시오"
}
`;

const finalPrompt = `${scoringCriteria}${examplePrompt}`;

export const reportGptPrompt = async (code: string) => {
  const sixMonthsPrice = await getStockPrice(code, "month", "NASDAQ");
  const sixMonthsPriceString = sixMonthsPrice
    .map(
      (item) =>
        `날짜: ${item.localDate}, 종가: ${item.closePrice}, 시가: ${item.openPrice}, 최고가: ${item.highPrice}, 최저가: ${item.lowPrice}, 거래량: ${item.accumulatedTradingVolume}`,
    )
    .join("\n");

  const system = `
당신은 주식 분석 전문가 입니다. 사용자가 입력한 주식 정보와 최근 6개월의 주식 데이터를 제공합니다. 주식의 투자 가치를 평가하는 프로그램을 작성해야 합니다. 주식의 투자 가치는 주가, 투자지수, 수익성, 성장성, 관심도 등 다양한 요소를 고려하여 평가합니다. 각 요소에 대한 점수는 0에서 100까지 부여되며, 해당 종합 점수의 평균을 계산하여 적용합니다.
결과를 JSON 형식으로 사용자에게 반환하세요. 반드시 예제 형식에 맞게 JSON으로만 응답하세요. JSON 형식 이외의 내용을 포함하지 마세요
`;
  const message = `
조회 할 주식 정보: ${code}
최근 6개월의 주식 데이터: ${sixMonthsPriceString}
${finalPrompt}
`;

  return { system, message };
};

// llama3 요청 문자열
//   return `<|begin_of_text|>
// <|begin_of_text|><|start_header_id|>system<|end_header_id|>
// ${finalPrompt}<|eot_id|>
// <|start_header_id|>user<|end_header_id|>
// ${code}<|eot_id|>
// <|start_header_id|>assistant<|end_header_id|>`;
