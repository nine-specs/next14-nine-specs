import React from "react";
import FavoriteStockList from "./_components/FavoriteStockList";
import { getMyStocks } from "@/hooks/profile/useStocksHandler";

export default async function page() {
  const myStockData = await getMyStocks(); // 나의 관심종목 가져오기 서버액션 매소드
  return (
    <>
      <FavoriteStockList data={myStockData} />
    </>
  );
}
