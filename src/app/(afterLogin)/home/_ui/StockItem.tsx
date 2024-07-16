import BodyFont from "@/common/BodyFont";
import IconButton from "@/common/IconButton";
import { BASE_URL } from "@/constants";
import StockUpDown from "../_components/reports/StockUpDown";
import Image from "next/image";

/**
 * 주식 종목 아이템
 */
export default async function StockItem(props: any) {
  const { stockId: id, stockCode: code, stockName: name } = props;

  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } = await (
    await fetch(`${BASE_URL}/api/stock?code=${code}`)
  ).json();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${code}.svg`}
            alt={name}
            width={64}
            height={64}
            className="h-auto"
          />
          <div>
            <BodyFont level="2" weight="bold">
              {name}
            </BodyFont>
            <BodyFont level="5" weight="regular">
              {id}
            </BodyFont>
          </div>
        </div>
        <div className="text-right">
          <BodyFont level="3" weight="medium">
            ${closePrice}
          </BodyFont>
          <StockUpDown
            changeRate={compareToPreviousClosePrice}
            fluctuation={fluctuationsRatio}
          />
        </div>
      </div>
    </>
  );
}
