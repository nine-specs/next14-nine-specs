import ReportContainer from "@/components/Report/ReportContainer";
import { StockInfo } from "@/components/Report/type/report/stockType";
import { mockStockDataList } from "@/constants/stockSearchMockData/mockStockDataList";

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params }: Props) {
  const { id } = params;
  const deCodeId = await decodeURIComponent(id);

  const addStockList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/report/stockList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockStockDataList),
    },
  ); // 주식 리스트 추가

  const fetchStockList = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/report/stockList?stockName=${deCodeId.replace(/\s+/g, "")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const stockInfo = await fetchStockList.json();
  
  if (!stockInfo) {
    return (
      <div>
        <h1>Not Found</h1>
        <p>The stock information you are looking for does not exist.</p>
      </div>
    );
  }
  return <ReportContainer stockInfo={stockInfo} />;
}
