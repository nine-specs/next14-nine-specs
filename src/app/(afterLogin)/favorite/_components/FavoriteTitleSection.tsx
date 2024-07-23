"use client";
import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import React, { useEffect, useState } from "react";
import AddFavoriteModal from "./AddFavoriteModal";
import { TstockInfoList } from "./FavoriteStockLists";
import { stockListByStockName } from "@/hooks/discovery/useSearchAction";
import { useRecentKeywordStore, TrecentData } from "@/store/useRecentKeywordStore";

export type TFavoriteTitleSection = {
  popularSearchData: {
    stockName: string;
    stockId: string;
    stockCode: string;
  }[];
};

export default function FavoriteTitleSection({ popularSearchData }: TFavoriteTitleSection) {
  const [isAddFavoriteModalOpened, setAddFavoriteModalOpened] = useState(false); // 모달 열고닫기
  const [stockInfoList, setStockInfoList] = useState<TstockInfoList>([]);
  const { recentKeywordList, setRecentKeywordList } = useRecentKeywordStore(); //

  // 최근 검색종목 데이터가져오기
  useEffect(() => {
    (async () => {
      const savedRecentData = localStorage.getItem("recentData");
      if (savedRecentData) {
        const parsedRecentData: TrecentData = JSON.parse(savedRecentData);
        setRecentKeywordList(parsedRecentData);
        console.log("최근검색어", parsedRecentData);

        const stockNameList = parsedRecentData.map((item) => item.keyword);
        if (stockNameList.length > 0) {
          try {
            const recentStockDataList = await stockListByStockName(stockNameList);
            console.log("최근검색데이터리스트", recentStockDataList);
            if (recentStockDataList) {
              setStockInfoList(recentStockDataList);
              console.log("최근검색어의 주식데이터", recentStockDataList[0]);
            }
          } catch (e) {
            console.error("Error:", e);
          }
        }
      }
    })();
  }, [setRecentKeywordList]);

  return (
    <>
      <div className="w-[1214px] h-9  flex justify-between">
        <HeadingFont level="4" weight="bold" className="text-primary-900">
          김스팩님의 관심종목
        </HeadingFont>
        <div className="w-[189px]">
          {/* 관심종목 추가 버튼 - 누르면 모달창 open */}
          <TextButton
            variant="primary"
            size="sm"
            onClick={(e) => {
              setAddFavoriteModalOpened(!isAddFavoriteModalOpened);
            }}
          >
            관심종목 추가
          </TextButton>
        </div>
      </div>
      {isAddFavoriteModalOpened && (
        <AddFavoriteModal
          onClose={() => setAddFavoriteModalOpened(false)}
          popularSearchData={popularSearchData}
          recentData={stockInfoList}
        />
      )}
    </>
  );
}
