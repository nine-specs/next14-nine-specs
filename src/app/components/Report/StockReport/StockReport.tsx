import BodyFont from "@/common/BodyFont";
import StockReportList from "./StockReportList";
import HeadingFont from "@/common/HeadingFont";
import dynamic from "next/dynamic";
import { gptTokenApi } from "@/service/report/gptTokenApi";
import { gptReplyApi } from "@/service/report/gptReplyApi";

const StockPolarChart = dynamic(() => import("./StockPolarChart"), {
  ssr: false, // Disable SSR for this component
  loading: () => null, // Component to render while loading
});
interface Props {
  ticker?: string;
}
export default async function StockReport({ ticker }: Props) {
  if (!ticker) return null;
  /**
   * 투자지수
긍정: 주가 상승이나 기업 실적 개선 등을 의미합니다. 이는 투자자들에게 긍정적인 전망을 제시합니다.
중립: 안정적인 상태이며 큰 변동이 예상되지 않을 때를 의미합니다. 시장의 일정한 균형 상태를 나타냅니다.
부정: 불확실성이나 부정적인 전망을 포함합니다. 이는 투자자들에게 신중한 접근을 요구할 수 있습니다.

수익성

높음: 과거에도 안정적이고 높은 수익을 창출했으며 미래에도 뛰어난 성과를 이룰 것으로 예상됩니다.
중간: 높은 수익을 기대하기 어렵지만 낮은 수익을 내지도 않는 상태로, 평균적인 수익성을 나타냅니다.
낮음: 과거 성과가 좋지 않았거나 미래에 큰 성장이 기대되지 않는 상황입니다.
관심도

상승: 과거에 비해 종목에 대한 관심이 증가하고 있으며 향후에도 계속해서 상승할 것으로 예상됩니다.
평균: 투자자들에게 해당 주제에 대한 관심이 크게 변하지 않고 상대적으로 안정된 상태를 유지하고 있습니다.
하락: 투자자들에게 해당 주제에 대한 관심이 감소하고 있는 추세임을 알려줍니다.
성장성

상승: 매출이나 이익이 증가하고 있거나, 시장 점유율이 확대되어 미래에 높은 성장을 기대할 수 있는 상태입니다.
평균: 성장 가능성이 일정한 수준을 유지하며 기업의 성장이 특별히 빠르지도 느리지도 않은 상태입니다.
하락: 매출이나 이익이 감소하고 있거나, 시장 점유율이 축소되어 성장 가능성이 감소하며 미래의 성장에 대한 불확실성을 안고 있는 상태입니다
 */

  /**
   * 시스템 프롬프트 사용: Llama 2에 명확한 역할을 주어 특정 행동이나 스타일로 응답하도록 설정합니다. 예를 들어, "You are a pirate"라고 설정하면 해적처럼 말하게 할 수 있습니다.상세한 지시 제공: Llama에게 단계별로 설명하도록 요청하거나 구체적인 예를 제시하여 복잡한 문제를 해결하도록 할 수 있습니다.
   */

  const dataCollection =
    "Collect industry average data and stock data for the ticker provided by the user.";
  // 사용자 제공 티커에 대한 산업 평균 데이터 및 주식 데이터를 수집합니다.

  const scoreCalculation =
    "Calculate scores for investment index, profitability, attention level, growth, and stock price based on collected data.";
  // 수집된 데이터를 기반으로 투자지수, 수익성, 관심도, 성장성, 주가에 대한 점수를 계산합니다.

  const applyBenchmarks =
    "Apply specific percentage benchmarks to evaluate each category:";
  // 각 카테고리에 대한 구체적인 퍼센티지 벤치마크를 적용하십시오:

  const investmentIndexBenchmark =
    "for the investment index, a 20% increase denotes a positive rating, while a 10% decrease denotes a negative rating;";
  // 투자지수의 경우 20% 증가는 긍정적인 평가를 의미하고, 10% 감소는 부정적인 평가를 의미합니다;

  const profitabilityBenchmark =
    "for profitability, compare net profit margins against industry averages;";
  // 수익성의 경우 업계 평균에 대한 순이익률을 비교합니다;

  const attentionLevelBenchmark =
    "for attention level, assess changes in media mentions over the past six months;";
  // 관심도의 경우 지난 6개월 동안 미디어 언급의 변화를 평가합니다;

  const growthBenchmark =
    "for growth, evaluate changes in revenue or market share;";
  // 성장성의 경우 매출이나 시장 점유율의 변화를 평가합니다;

  const stockPriceBenchmark =
    "for stock price, analyze changes over the past year.";
  // 주가의 경우 지난 한 해 동안의 변화를 분석합니다;

  const averageScores =
    "Average the individual scores to compute the overall score.";
  // 개별 점수를 평균내어 전체 점수를 산출하고,

  const formatResults =
    "Format all results into a JSON object including the overall score, detailed scores for each category, and the analyst opinion.";
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
    },
    {
      "subject": "투자지수",
      "score": 76,
      "justification": "투자지수는 시장 평균보다 20% 높아 투자 매력이 매우 큽니다."
    },
    {
      "subject": "수익성",
      "score": 92,
      "justification": "수익성 지표는 업계 평균을 훨씬 웃돌아 강력한 재무 건전성을 나타냅니다."
    },
    {
      "subject": "성장성",
      "score": 70,
      "justification": "지난 해 매출이 18% 증가하여 견고한 성장세를 입증했습니다."
    },
    {
      "subject": "관심도",
      "score": 72,
      "justification": "미디어 언급이 지난 6개월 동안 15% 증가하여 지속적인 관심을 받고 있습니다."
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
    scoreCalculation +
    " " +
    applyBenchmarks +
    " " +
    investmentIndexBenchmark +
    " " +
    profitabilityBenchmark +
    " " +
    attentionLevelBenchmark +
    " " +
    growthBenchmark +
    " " +
    stockPriceBenchmark +
    " " +
    averageScores +
    " " +
    formatResults +
    " " +
    returnResults +
    " " +
    "Example response: " +
    exampleResponse;

  const userMessageForPropmt = `<|begin_of_text|>
  <|begin_of_text|><|start_header_id|>system<|end_header_id|>
 ${finalPrompt}<|eot_id|>
  <|start_header_id|>user<|end_header_id|>
  ${ticker}<|eot_id|>
  <|start_header_id|>assistant<|end_header_id|>`;
  /**
 "사용자가 제공한 티커에 대한 산업 평균 데이터 및 주식 데이터를 수집합니다. 수집된 데이터를 기반으로 투자지수, 수익성, 관심도, 성장성, 주가에 대한 점수를 계산합니다. 각 카테고리에 대한 구체적인 퍼센티지 벤치마크를 적용하여 평가하십시오: 투자지수의 경우 20% 증가는 긍정적인 평가를 의미하고, 10% 감소는 부정적인 평가를 의미합니다; 수익성의 경우 업계 평균에 대한 순이익률을 비교합니다; 관심도의 경우 지난 6개월 동안 미디어 언급의 변화를 평가합니다; 성장성의 경우 매출이나 시장 점유율의 변화를 평가합니다; 주가의 경우 지난 한 해 동안의 변화를 분석합니다. 개별 점수를 평균내어 전체 점수를 산출하고, 전체 점수와 각 카테고리에 대한 상세 점수를 포함하는 JSON 객체로 모든 결과를 포맷하여 사용자에게 응답으로 반환합니다."
   */

  const token = await gptTokenApi();
  const res = await gptReplyApi({
    token: token,
    userMessage: userMessageForPropmt,
    temperature: 0.5,
    topP: 0.5,
    stream: false,
  });
  const parsedRes = JSON.parse(res as string);
  const overallScore = parsedRes?.overallScore;
  const chartData = parsedRes.scores;
  return (
    <section className="space-y-6">
      <div className="flex justify-between ">
        <BodyFont level="1" weight="bold">
          종목 AI 리포트
        </BodyFont>
        <HeadingFont level="3" weight="medium" className="text-grayscale-700">
          {overallScore}점
        </HeadingFont>
      </div>

      <div className="flex justify-between ">
        <StockPolarChart data={chartData} />
        <StockReportList chartData={chartData} />
      </div>
    </section>
  );
}
