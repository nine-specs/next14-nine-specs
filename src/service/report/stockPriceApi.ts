import { StockPrice } from "@/components/Report/type/report/stockType";

/**
 * @param {string} stockCode 주식 코드 TSLA.O
 * @param {string} periodType 기간 타입 dayCandle ,  weekCandle , monthCandle,  year , month ${periodType}&range=${range}
 * @param {string } stockExchangeType 증권 거래소 NASDAQ,
 * @returns {StockPrice[]} 
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
    cache: "no-store",
  });
  const data = await fetchData.json();
  return data.priceInfos;
};
