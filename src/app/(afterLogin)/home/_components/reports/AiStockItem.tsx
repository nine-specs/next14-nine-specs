import { Suspense } from "react";
import BodyFont from "@/common/BodyFont";

import Image from "next/image";
import StockUpDown from "./StockUpDown";
import StockChartReport from "./StockChartReport";
import { BASE_URL } from "@/constants";
import { StockType } from "../../page";

export default async function AiStockItem(props: StockType) {
  const { stockId: id, stockCode: code, stockName: name } = props;

  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } = await (
    await fetch(`${BASE_URL}/api/stock?code=${code}`)
  ).json();

  return (
    <div className="p-8 flex flex-col justify-between h-full">
      <div>
        {/* 종목 정보 */}
        <div className="flex items-center gap-2">
          <Image
            src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${code}.svg`}
            alt={name}
            width={32}
            height={32}
            className="h-auto"
          />
          <BodyFont level="1" weight="bold">
            {name}
          </BodyFont>
          <BodyFont level="3" weight="regular" className="text-grayscale-600">
            {id}
          </BodyFont>
        </div>
        {/* 가격 등락 */}
        <div className="flex items-center gap-2">
          <BodyFont level="4" weight="regular">
            ${closePrice}
          </BodyFont>
          <StockUpDown
            changeRate={compareToPreviousClosePrice}
            fluctuation={fluctuationsRatio}
          />
        </div>
      </div>
      {/* 차트와 리포트 */}
      <Suspense fallback={<div>리포트 로딩중...</div>}>
        <StockChartReport code={code} />
      </Suspense>
    </div>
  );
}
