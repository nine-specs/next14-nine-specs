import React, { Suspense } from "react";

import { StockInfo } from "../type/stockType";
import FavorStockItem from "./FavorStockItem";
import CardWrap from "@/common/CardWrap";

interface Props {
  stockInfo: StockInfo | undefined;
}

/**
 * 관심종목 리스트 컴포넌트
 * 만약 관심 정보가 없다면 null 반환
 * 관심 정보 배열로 받을 예정
 * @param {Props} { stockInfo } 조회할 종목 정보들
 * @returns
 */
export default async function FavorStockList({ stockInfo }: Props) {
  if (!stockInfo) return null;
  // 현재 임시로 stockInfo를 복사하여 리스트를 만들어서 렌더링
  // 추후에는 전달받은 stockInfo의 배열을 사용할 예정
  // stockInfo는
  // ticker: string;
  // name: string;
  // code: string;
  const StockInfoList = [
    { ...stockInfo },
    { ...stockInfo },
    { ...stockInfo },
    { ...stockInfo },
  ];
  return (
    <>
      {StockInfoList &&
        StockInfoList.map((stockInfo) => (
          <div className="w-[387px] mb-3">
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
