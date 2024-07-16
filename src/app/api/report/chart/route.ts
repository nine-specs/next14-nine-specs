import { StockPrice } from "@/components/Report/type/report/stockType";
import { getStockPrice } from "@/service/report/stockPriceApi";
import dayjs from "dayjs";

interface ProcessResult {
  status: "fulfilled" | "rejected";
  value?: StockPrice[];
  reason?: string;
}
const stockFormatData = (data: StockPrice[], formatDate: string) => {
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

export async function POST(request: Request) {
  const { code } = await request.json();

  const fetchData = Promise.allSettled([
    getStockPrice(code, "day", "NASDAQ"),
    getStockPrice(code, "month&range=3", "NASDAQ"),
    getStockPrice(code, "month&range=12", "NASDAQ"),
    getStockPrice(code, "year&range=3", "NASDAQ"),
    getStockPrice(code, "year&range=10", "NASDAQ"),
  ]);

  const results = await fetchData;

  const processResult = (
    result: ProcessResult,
    format: string,
  ): StockPrice[] | null => {
    return result.status === "fulfilled" && result.value !== undefined
      ? stockFormatData(result.value, format)
      : null;
  };
  const allData = {
    "1일": processResult(results[0], "HH:mm"),
    "3개월": processResult(results[1], "YY/MM/DD"),
    "1년": processResult(results[2], "YY/MM"),
    "3년": processResult(results[3], "YY/MM"),
    "10년": processResult(results[4], "YY/MM"),
  };
  return new Response(JSON.stringify(allData));
}
