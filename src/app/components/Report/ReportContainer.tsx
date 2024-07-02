import CardWrap from "@/common/CardWrap";

import StockHeader from "./StockHeader/StockHeader";
import StockSumary from "./StockSumary/StockSumary";
import StockReport from "./StockReport/StockReport";
import StockAnalysis from "./StockAnalysis/StockAnalysis";
import StockChart from "./StockChart/StockChart";
import { Suspense } from "react";
import BodyFont from "@/common/BodyFont";

interface StockInfo {
  ticker: string;
  name: string;
  code: string;
}
interface Props {
  stockInfo: StockInfo | undefined;
}

/**
 * 메인 페이지
 * @returns
 */
export default async function ReportContainer({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { ticker, name, code } = stockInfo;
  return (
    <div className=" w-[1200px] mx-auto py-12  ">
      <div className="flex flex-col flex-wrap gap-6">
        {/* 주식  헤더 영역  */}
        <StockHeader stockInfo={stockInfo} />
        {/* 첫번째 줄 */}
        <article className="flex justify-between flex-wrap ">
          <CardWrap width="488px" height="256px" padding>
            <StockSumary code={code} ticker={ticker} />
          </CardWrap>
          <CardWrap width="690px" height="256px" padding>
            <StockChart code={code} />
          </CardWrap>
        </article>

        {/* 두번째 줄 */}
        <article className="flex justify-between flex-wrap">
          <CardWrap width="429px" height="297px" padding>
            <Suspense
              fallback={
                <>
                  <BodyFont level="1" weight="bold">
                    종목 AI 리포트
                  </BodyFont>
                  <BodyFont level="5" weight="bold">차트 불러오는 중...</BodyFont>
                </>
              }
            >
              <StockReport ticker={ticker} />
            </Suspense>
          </CardWrap>
          <CardWrap width="750px" height="297px" padding>
            <StockAnalysis stockInfo={stockInfo} />
          </CardWrap>
        </article>
      </div>
    </div>
  );
}
