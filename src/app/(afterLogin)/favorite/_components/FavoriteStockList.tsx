"use client";
import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import FavoriteStockItem from "./FavoriteStockItem";
import { useState } from "react";
import AddFavoriteModal from "./AddFavoriteModal";
import { TMyStocks, TStocks } from "@/hooks/profile/useStocksHandler";
import FavoriteTitleSection from "./FavoriteTitleSection";

type TFavoriteStockList = {
  // 내관심종목 데이터 타입
  data: TMyStocks[];
  popularSearchData: {
    id: string;
    stockName: string;
  }[];
};

export default function FavoriteStockList({
  data,
  popularSearchData,
}: TFavoriteStockList) {
  return (
    <>
      <div className="w-[1214px] h-auto  flex flex-col justify-between gap-6 mx-auto  mt-[56px]">
        <FavoriteTitleSection popularSearchData={popularSearchData} />
        <div className="flex flex-col justify-between gap-6">
          {/* 관심종목 리스트 */}
          <div className="w-[1214px] min-h-[360px]  flex  gap-[19px] flex-wrap justify-start">
            {data.map((item, index) => (
              <FavoriteStockItem myStock={item.stockName} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
