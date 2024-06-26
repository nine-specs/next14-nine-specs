import BodyFont from "@/common/BodyFont";
import IconButton from "@/common/IconButton";

/**
 * 주식 종목 아이템
 */
export default function StockItem() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <IconButton>icon</IconButton>
          <div>
            <BodyFont level="2" weight="bold">
              애플
            </BodyFont>
            <BodyFont level="5" weight="regular">
              AAPL
            </BodyFont>
          </div>
        </div>
        <div className="text-right">
          <BodyFont level="3" weight="medium">
            $00.00
          </BodyFont>
          <div className="flex gap-2 text-secondary-600">
            <BodyFont level="4" weight="regular">
              ▼1.75
            </BodyFont>
            <BodyFont level="4" weight="regular">
              -0.82%
            </BodyFont>
          </div>
        </div>
      </div>
    </>
  );
}
