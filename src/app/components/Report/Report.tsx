import CardWrap from "@/common/CardWrap";
import StockIcon from "./Stock/StockIcon";
import BodyFont from "@/common/BodyFont";
import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import StockAnalysis from "./Stock/StockAnalysis";
import StockSumary from "./Stock/StockSumary";
import StockChart from "./Stock/StockChart";
import StockReport from "./Stock/StockReport";
import StockHeader from "./Stock/StockHeader";

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
export default function Report({ SumaryData }: Props) {
  return (
    <div className=" w-[1200px] mx-auto py-12  ">
      <div className="flex flex-col flex-wrap gap-6">
        {/* 주식  헤더 영역  */}
        <StockHeader />
        {/* 첫번째 줄 */}
        <article className="flex justify-between flex-wrap ">
          <CardWrap width="488px" height="256px" padding>
            <StockSumary />
          </CardWrap>
          <CardWrap width="690px" height="256px" padding>
            <StockChart />
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
