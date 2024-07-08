import BodyFont from "@/common/BodyFont";
import StockExchage from "./StockExchage";
import { getStockDetails } from "@/service/report/stockDetailsApi";
import { getStockSummary } from "@/service/report/stockSummaryApi";
import { getExchangeRate } from "@/service/report/exchangeRateApi";

interface Props {
  code: string;
  ticker: string;
}
/**
 * 주식 요약 정보
 * @price {string} - 주식 가격
 * @returns
 */
export default async function StockSummary({ code, ticker }: Props) {
  if (!code) return null;

  const exchangeRate = await getExchangeRate();
  const stockInfomation = await getStockDetails(code);
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    stockInfomation;
  const content = await getStockSummary(code);
  const convertContent = content.replace(/<[^>]*>?/gm, "");
  return (
    <div className="flex flex-col justify-between gap-6 ">
      {/* 원달라 환율  */}
      <StockExchage
        price={closePrice}
        ticker={ticker}
        fluctuation={fluctuationsRatio}
        exchangeRate={exchangeRate}
        changeRate={compareToPreviousClosePrice}
      />
      {/* 주식 설명 */}
      <div className="  h-[100px] overflow-hidden hover:overflow-y-scroll ">
        <div className="w-[400px]">
          <BodyFont level="4" weight="regular">
            {convertContent}
          </BodyFont>
        </div>
      </div>
    </div>
  );
}
