interface StockSumaryProps {
  price?: string;
  ticker?: string;
  content?: string;
  fluctuation?: number;
  changeRate?: number;
  exchangeRate?: string;
}

interface StockSubRateProps {
  fluctuation?: number;
  changeRate?: number;
}

interface StockReportListProps {
  주식: number;
  투자지수: number;
  수익성: number;
  성장성: number;
  관심도: number;
}

export interface StockInfo {
  ticker: string;
  name: string;
  code: string;
}
