/**
 * 주식 요약을 가져오는 API  네이버 주식 API를 사용하여 주식 요약을 가져온다.
 * @param stockCode 주식 코드
 * @returns {string} 주식 요약
 *  * 예시 : 마이크로소프트는 기술 회사다. 이 회사는 소프트웨어, 서비스, 디바이스, 솔루션을 개발하고 지원한다.<br>사업 부문은 Productivity & Business Process, Intelligent Cloud
 */
export const getStockSummary = async (stockCode: string): Promise<string> => {
  const response = await fetch(
    `https://api.stock.naver.com/stock/${stockCode}/overview`,
  );
  const data = await response.json();
  return data.summary;
};
