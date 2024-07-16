import { getStockSummary } from "@/service/report/stockSummaryApi";
/**
 *  주식 요약 통신 api
 * @param {Request} request 주식 code 전송
 * @returns 주식 요약
 * exchangeRate,
    summary,
 */
export async function POST(request: Request) {
  const { code } = await request.json();

  const data = await getStockSummary(code);
  const summary = data.replace(/<[^>]*>?/gm, "");
  return new Response(JSON.stringify(summary));
}
