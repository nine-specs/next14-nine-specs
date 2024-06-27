import HeadingFont from "@/common/HeadingFont";
import BodyFont from "@/common/BodyFont";
import StockFavorButton from "./StockFavorButton";
import StockLogoImage from "../ReportCommon/StockLogoImage";

interface Props {
  title?: string;
  subTile?: string;
}
/**
 * 주식 헤더 컴포넌트 주식 아이콘 , 주식 이름  , 관심종목 추가 버튼을 포함
 * @param {string} title - 주식 이름
 * @param {string} subTile - 주식 코드
 * @returns
 */
export default function StockHeader({
  title = "애플",
  subTile = "AAPL",
}: Props) {
  return ( 
    <article className="flex justify-between">
      <div className="flex items-center gap-3">
        <StockLogoImage width={64} height={64} />
        <div className="flex gap-2 items-center">
          <HeadingFont level="4" weight="bold">
            {title}
          </HeadingFont>
          <BodyFont level="2" weight="regular">
            ∙
          </BodyFont>
          <BodyFont level="2" weight="medium">
            {subTile}
          </BodyFont>
        </div>
      </div>
      <StockFavorButton />
    </article>
  );
}
