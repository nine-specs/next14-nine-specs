/**
 * 주식 정보
 * @param {string} ticker - 주식 코드
 * @param {string} name - 주식 코드
 * @param {string} code - 주식 코드
 */
export interface StockInfo {
  ticker: string;
  name: string;
  code: string;
}
export interface StockPrice {
  localDate?: string;
  closePrice?: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  accumulatedTradingVolume: number;
  currentPrice?: number;
  localDateTime?: string;
  date?: string;
}
