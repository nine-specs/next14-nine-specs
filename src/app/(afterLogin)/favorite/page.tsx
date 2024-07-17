import React from "react";
import FavoriteStockLists from "./_components/FavoriteStockLists";
import { getMyStocks, getMyStocksData } from "@/hooks/profile/useStocksHandler";
import { getPopularSearches } from "@/hooks/discovery/useGetSearchData";
import { create } from "zustand";

export default async function page() {
  const myStocks = await getMyStocks(); // 나의 관심종목 가져오기 서버액션 매소드
  const popularSearchData = await getPopularSearches(); //인기 검색어 리스트 가져오기

  return (
    <>
      <FavoriteStockLists
        data={myStocks}
        popularSearchData={popularSearchData}
      />
    </>
  );
}
