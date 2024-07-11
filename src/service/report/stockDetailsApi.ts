import { StockDetails } from "@/components/Report/type/report/stockType";

/**
 * 주식 시세 변동 정보를 가져오는 API
 * @param {string} ticker 주식 코드 TSLA.O
 * @returns {object} 주식 시세 변동 정보 배열 { closePrice: 15.9373, fluctuationsRatio: 0.041, compareToPreviousClosePrice: 0.625 }
 */
export const getStockDetails = async (
  ticker: string,
): Promise<StockDetails> => {
  const response = await fetch(
    `https://polling.finance.naver.com/api/realtime/worldstock/stock/${ticker}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const data = await response.json();
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    data.datas[0];
  return {
    closePrice,
    fluctuationsRatio,
    compareToPreviousClosePrice,
  };
};
