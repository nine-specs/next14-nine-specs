import CardWrap from "@/common/CardWrap";

import { exchangeApi } from "@/service/report/exchangeApi";
import dynamic from "next/dynamic";
import BodyFont from "@/common/BodyFont";
import StockHeader from "./StockHeader/StockHeader";
import StockSumary from "./StockSumary/StockSumary";
import StockReport from "./StockReport/StockReport";
import StockAnalysis from "./StockAnalysis/StockAnalysis";
const StockAreaChart = dynamic(() => import("./StockChart/StockAreaChart"), {
  ssr: false, // Disable SSR for this component
  loading: () => (
    <BodyFont level="1" weight="bold">
      주가 차트
    </BodyFont>
  ), // Component to render while loading
});
interface StockPrice {
  date: string;
  price: number;
}

interface SumaryData {
  title: string;
  subTile: string;
  content: string;
}
interface Props {
  SumaryData?: SumaryData;
  StockPrice?: StockPrice[];
}
/**
 * 메인 페이지
 * @param {string} ReportData - AI 생성 리포트 데이터
 * @param {StockPrice[]} StockPrice - 주식 차트 데이터
 * @returns
 */
export default async function ReportContainer({ SumaryData }: Props) {
  const exchangeRate: string = await exchangeApi();

  return (
    <div className=" w-[1200px] mx-auto py-12  ">
      <div className="flex flex-col flex-wrap gap-6">
        {/* 주식  헤더 영역  */}
        <StockHeader />
        {/* 첫번째 줄 */}
        <article className="flex justify-between flex-wrap ">
          <CardWrap width="488px" height="256px" padding>
            <StockSumary exchangeRate={exchangeRate} />
          </CardWrap>
          <CardWrap width="690px" height="256px" padding>
            <StockAreaChart />
          </CardWrap>
        </article>

        {/* 두번째 줄 */}
        <article className="flex justify-between flex-wrap">
          <CardWrap width="429px" height="297px" padding>
            <StockReport />
          </CardWrap>
          <CardWrap width="750px" height="297px" padding>
            <StockAnalysis />
          </CardWrap>
        </article>
      </div>
    </div>
  );
}
