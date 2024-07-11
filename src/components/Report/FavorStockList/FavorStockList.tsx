import React, { Suspense } from "react";

import FavorStockItem from "./FavorStockItem";
import CardWrap from "@/common/CardWrap";
import { StockInfo } from "../type/report/stockType";
import { uuid } from "uuidv4";
interface Props {
  stockInfo: StockInfo;
}

/**
 * 관심종목 리스트 컴포넌트
 * @param {Props} { stockInfo[] } 조회할 종목 정보들
 * @returns
 */
export default async function FavorStockList({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const stockInfo2 = [
    stockInfo,
    {
      ticker: "AAPL",
      name: "애플",
      code: "AAPL.O",
    },
    {
      ticker: "AAPL",
      name: "애플",
      code: "AAPL.O",
    },
  ]; // 데이터 예시

  return (
    <>
      {stockInfo &&
        stockInfo2.map((stockInfo) => (
          <div className="w-[387px] mb-3" key={uuid()}>
            <CardWrap width="387px" height="304px" padding>
              <Suspense fallback={<div>관심목록 로딩중...</div>}>
                <FavorStockItem stockInfo={stockInfo} />
              </Suspense>
            </CardWrap>
          </div>
        ))}
    </>
  );
}
