import { StockPrice } from "@/app/components/Report/type/stockType";
/**
 * @param {string} stockCode 주식 코드 TSLA.O
 * @param {string} periodType 기간 타입 dayCandle ,  weekCandle , monthCandle,  year , month ${periodType}&range=${range}
 * @param {string } stockExchangeType 증권 거래소 NASDAQ,
 * @returns {object} 주식 가격 정보
 *   {
 *           "localDate": "20140627",
 *           "closePrice": 15.9373,
 *           "openPrice": 15.3007,
 *           "highPrice": 16.1253,
 *           "lowPrice": 15.2147,
 *           "accumulatedTradingVolume": 97339038
 *       },
 */
export const getStockPrice = async (
  stockCode: string,
  periodType: string,
  stockExchangeType: string,
): Promise<StockPrice[]> => {
  const URL = `https://api.stock.naver.com/chart/foreign/item/${stockCode}?periodType=${periodType}&stockExchangeType=${stockExchangeType}`;
  const fetchData = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await fetchData.json();
  return data.priceInfos;
};
