import ReportContainer from "@/components/Report/ReportContainer";
import { StockInfo } from "@/components/Report/type/report/stockType";

interface Props {
  params: {
    id: string;
  };
}

const goodStocks = [
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

const badStocks = [
  {
    ticker: "HOOD",
    name: "로빈후드",
    code: "HOOD.O",
  },
  {
    ticker: "SAVA",
    name: "카사바 사이언스",
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

const searchStockList: StockInfo[] = [...goodStocks, ...badStocks];

export default async function page({ params }: Props) {
  const { id } = params;
  const deCodeId = await decodeURIComponent(id);
  const stockInfo: StockInfo | undefined = searchStockList.find(
    (stock) => stock.name === deCodeId.replace(/\s+/g, ""),
  );
  return (
    <div>
      <ReportContainer stockInfo={stockInfo} />
    </div>
  );
}
