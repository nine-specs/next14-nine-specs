import { getExchangeRate } from "@/service/report/exchangeRateApi";
import { getStockDetails } from "@/service/report/stockDetailsApi";
/**
 * 환율 , 주식 등락 가격 정보
 * @param request
 * @returns 주식 환율 , 주식 등락 가격 정보
 * exchangeRate,
    closePrice,
    fluctuationsRatio,
    compareToPreviousClosePrice,
 */
export async function POST(request: Request) {
  const { code } = await request.json();

  const exchangeRate = await getExchangeRate(); // 원달러 환율

  const stockInfomation = await getStockDetails(code); // 주식 가격  정보
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    stockInfomation;

  const responseData = {
    exchangeRate,
    closePrice,
    fluctuationsRatio,
    compareToPreviousClosePrice,
  };
  console.log(responseData);
  return new Response(JSON.stringify(responseData));
}
