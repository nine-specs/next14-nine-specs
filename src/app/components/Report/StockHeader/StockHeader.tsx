import HeadingFont from "@/common/HeadingFont";
import BodyFont from "@/common/BodyFont";
import StockFavorButton from "./StockFavorButton";
import StockLogoImage from "../ReportCommon/StockLogoImage";
import { StockInfo } from "../type/stockType";

interface Props {
  stockInfo: StockInfo | undefined;
}

export default function StockHeader({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { name, code, ticker } = stockInfo;
  return (
    <article className="flex justify-between">
      <div className="flex items-center gap-3">
        <StockLogoImage width={64} height={64} code={code} />
        <div className="flex gap-2 items-center">
          <HeadingFont level="4" weight="bold">
            {name}
          </HeadingFont>
          <BodyFont level="2" weight="regular">
            ∙
          </BodyFont>
          <BodyFont level="2" weight="medium">
            {ticker}
          </BodyFont>
        </div>
      </div>
      <StockFavorButton />
    </article>
  );
}
