import { StockInfo } from "@/components/Report/type/report/stockType";
import { getStockPrice } from "@/service/report/stockPriceApi";

const prompt = `
당신은 유능한 주식 전문가 입니다 \n
제공한 정보를 바탕으로 주식에 대한 분석을 해주세요 \n
해당 주식의 매수의견과 매도 의견을 포함하여 애널리스트 분석을 해주세요 \n
답변은 한글로만 작성해주세요
`;

const prompt2 = `
"analystOpinion": {
"rating": "매수",
"justification": "테슬라는 강력한 성장과 수익성을 보이며, 안정적인 미디어 관심과 매우 긍정적인 투자 지수를 가지고 있습니다. 성장과 안정성을 추구하는 투자자에게 강력히 추천합니다."
}`;

export const userMessageForPrompt = async (
  stockInfo: StockInfo,
): Promise<string> => {
  const { ticker, name, code } = stockInfo;
  const price = await getStockPrice(ticker, name, code);
  console.log(price);
  const promptString = `
  <|begin_of_text|><|start_header_id|>system<|end_header_id|>
  ${prompt}<|eot_id|>
  <|start_header_id|>user<|end_header_id|>
  ${ticker} ${price}<|eot_id|>
  <|start_header_id|>assistant<|end_header_id|>
  `;
  return promptString;
};
