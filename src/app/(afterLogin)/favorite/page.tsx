import React from "react";
import FavoriteStockList from "./_components/FavoriteStockList";
import { getMyStocks, getMyStocksData } from "@/hooks/profile/useStocksHandler";
import { getPopularSearches } from "@/hooks/discovery/useGetSearchData";
import { create } from "zustand";

export default async function page() {
  const myStocks = await getMyStocks(); // 나의 관심종목 가져오기 서버액션 매소드
  const popularSearchData = await getPopularSearches(); //인기 검색어 리스트 가져오기

  return (
    <>
      <FavoriteStockList
        data={myStocks}
        popularSearchData={popularSearchData}
      />
    </>
  );
}
