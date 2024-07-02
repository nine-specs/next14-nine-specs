import ReportContainer from "@/app/components/Report/ReportContainer";
import { StockInfo } from "@/app/components/Report/type/stockType";
import { gptTokenApi } from "@/service/report/gptTokenApi";

interface Props {
  params: {
    id: string;
  };
}

const topGainers = [
  { ticker: "AVGO", name: "브로드컴", code: "AVGO.O" },
  { ticker: "TSLA", name: "테슬라", code: "TSLA.O" },
  { ticker: "NVDA", name: "엔비디아", code: "NVDA.O" },
  { ticker: "META", name: "메타 플랫폼스", code: "META.O" },
  { ticker: "MSFT", name: "마이크로소프트", code: "MSFT.O" },
];

const bottomDecliners = [
  { ticker: "NFLX", name: "넷플릭스", code: "NFLX.O" },
  { ticker: "AAPL", name: "애플", code: "AAPL.O" },
  { ticker: "GOOGL", name: "알파벳", code: "GOOGL.O" },
  { ticker: "AMZN", name: "아마존닷컴", code: "AMZN.O" },
  { ticker: "AMD", name: "AMD", code: "AMD.O" },
];

const searchStockList: StockInfo[] = [...topGainers, ...bottomDecliners];

export default async function page({ params }: Props) {
  const { id } = params;
  const deCodeId = await decodeURIComponent(id);
  const stockInfo: StockInfo | undefined = searchStockList.find(
    (stock) => stock.name === deCodeId,
  );
  console.log(stockInfo);
  return (
    <>
      <ReportContainer stockInfo={stockInfo} />
    </>
  );
}
