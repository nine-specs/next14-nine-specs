import BodyFont from "@/common/BodyFont";
import { stockPriceApi } from "@/service/report/stockPriceApi";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { StockPrice } from "../type/stockType";

const StockAreaChart = dynamic(() => import("../StockChart/StockAreaChart"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col  justify-center h-full items-center">
      <BodyFont level="5" weight="medium">
        차트 불러오는 중...
      </BodyFont>
    </div>
  ),
});
interface Props {
  code: string | undefined;
}

// 주식 차트 컴포넌트
export default async function StockChartLoader({ code }: Props) {
  if (!code) return null;

  const stockFormatData = (data: StockPrice[], formatDate?: string) => {
    return data.map((item: StockPrice) => {
      return {
        ...item,
        closePrice: item.closePrice ? item.closePrice : item.currentPrice,
        date: item.localDate
          ? dayjs(item.localDate).format(formatDate)
          : dayjs(item.localDateTime).format(formatDate),
      };
    });
  };
  const oneDayData = await stockPriceApi(code, "day", "NASDAQ");
  const threeMonthData = await stockPriceApi(code, "month&range=3", "NASDAQ");
  const oneYearData = await stockPriceApi(code, "month&range=12", "NASDAQ");
  const threeYearData = await stockPriceApi(code, "year&range=3", "NASDAQ");
  const tenYearData = await stockPriceApi(code, "year&range=10", "NASDAQ");
  const allData = {
    "1일": stockFormatData(oneDayData, "HH:mm"),
    "3개월": stockFormatData(threeMonthData, "YYYY/MM/DD"),
    "1년": stockFormatData(oneYearData, "YYYY/MM"),
    "3년": stockFormatData(threeYearData, "YYYY/MM"),
    "10년": stockFormatData(tenYearData, "YYYY/MM"),
  };

  return (
    <>
      <StockAreaChart allData={allData} />
    </>
  );
}
