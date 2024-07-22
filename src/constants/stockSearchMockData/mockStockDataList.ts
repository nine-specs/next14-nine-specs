import { StockInfo } from "@/components/Report/type/report/stockType";

// 좋은 주식 데이터
const goodStocks: StockInfo[] = [
  {
    ticker: "AVGO",
    name: "브로드컴",
    code: "AVGO.O",
  },
  {
    ticker: "AAPL",
    name: "애플",
    code: "AAPL.O",
  },
  {
    ticker: "NVDA",
    name: "엔비디아",
    code: "NVDA.O",
  },
  {
    ticker: "AMZN",
    name: "아마존",
    code: "AMZN.O",
  },
  {
    ticker: "MSFT",
    name: "마이크로소프트",
    code: "MSFT.O",
  },
];

// 나쁜 주식 데이터
const badStocks: StockInfo[] = [
  {
    ticker: "HOOD",
    name: "로빈후드",
    code: "HOOD.O",
  },
  {
    ticker: "SAVA",
    name: "카사바사이언스",
    code: "SAVA.O",
  },
  {
    ticker: "PTON",
    name: "펠로톤",
    code: "PTON.O",
  },
  {
    ticker: "GPRO",
    name: "고프로",
    code: "GPRO.O",
  },
  {
    ticker: "KODK",
    name: "코닥",
    code: "KODK.O",
  },
];
const defaltStocks: StockInfo[] = [
  { ticker: "AAPL", name: "애플", code: "AAPL.O" },
  { ticker: "TSLA", name: "테슬라", code: "TSLA.O" },
  { ticker: "AMZN", name: "아마존", code: "AMZN.O" },
  { ticker: "MSFT", name: "MS", code: "MSFT.O" },
  { ticker: "GOOGL", name: "구글", code: "GOOGL.O" },
  { ticker: "U", name: "유니티", code: "U" },
];
// 전체 목데이터 리스트
export const mockStockDataList: StockInfo[] = [...goodStocks, ...badStocks, ...defaltStocks];
