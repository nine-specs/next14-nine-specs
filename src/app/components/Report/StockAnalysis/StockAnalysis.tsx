import BodyFont from "@/common/BodyFont";
import StockLogoImage from "../ReportCommon/StockLogoImage";
import StockSubRate from "../ReportCommon/StockSubRate";
import StockGptAnalysisReply from "./StockGptAnalysisReply";
import { Suspense } from "react";
import { stockInfoSummay } from "@/service/report/stockInfo";
interface StockInfo {
  ticker: string;
  name: string;
  code: string;
}
interface Props {
  stockInfo: StockInfo | undefined;
}
/**
 *
 */
export default async function StockAnalysis({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { ticker, name, code } = stockInfo;
  const stockInfomation = await stockInfoSummay(code);
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    stockInfomation;

  return (
    <section className="flex flex-col gap-14">
      <BodyFont level="1" weight="bold">
        아잇나우 AI 애널리스트 리포트
      </BodyFont>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 ">
            <StockLogoImage width={32} height={32} code={code} />
            <div className="flex gap-1">
              <BodyFont level="3" weight="medium">
                {name}
              </BodyFont>
              <BodyFont level="3" weight="regular">
                ∙
              </BodyFont>
              <BodyFont level="3" weight="medium">
                {ticker}
              </BodyFont>{" "}
            </div>
          </div>
          <div className="flex p-0.5 items-center gap-0.5">
            <BodyFont level="4" weight="medium">
              {`$${closePrice}`}
            </BodyFont>
          </div>
          <div className="flex gap-2">
            <StockSubRate
              fluctuation={fluctuationsRatio}
              changeRate={compareToPreviousClosePrice}
              weight="regular"
              level="4"
            />
          </div>
        </div>
        <Suspense
          fallback={
            <BodyFont level="5" weight="bold">
              애널리스트 의견 불러오는 중...
            </BodyFont>
          }
        >
          <StockGptAnalysisReply ticker={ticker} />
        </Suspense>
      </div>
    </section>
  );
}
