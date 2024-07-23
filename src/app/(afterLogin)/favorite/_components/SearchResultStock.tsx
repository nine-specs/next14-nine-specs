"use client";
import BodyFont from "@/common/BodyFont";
import TextButton from "@/common/TextButton";
import { getMyStocks, TMyStocks, TStocks } from "@/hooks/profile/useStocksHandler";
import React, { useEffect, useState } from "react";
import loadingSpinner from "/public/images/loading/loadingSpiner.gif";
import Image from "next/image";
import { BASE_URL } from "@/constants";
import { TstockInfoList } from "./FavoriteStockLists";
import StockItemClient from "./_components/StockItemClient";
import { update } from "firebase/database";
import { updateData } from "@/components/Report/StockHeader/StockFavorButton";

type TSearchResultStock = {
  searchData: TStocks;
  userId: string;
};

export default function SearchResultStock({ searchData, userId }: TSearchResultStock) {
  const [isMyStock, setIsMyStock] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let stockInfoList: TstockInfoList = [];
  // 타입 변환
  stockInfoList.push({
    ticker: searchData.stockId,
    name: searchData.stockName,
    code: searchData.stockCode,
  });

  useEffect(() => {
    const fetchMyStocks = async () => {
      try {
        const myStocks = await getMyStocks();
        console.log("내관심종목" + myStocks);

        const stockExists = myStocks.some((stock: TMyStocks, index: number, array: TMyStocks[]) => {
          console.log(stock);
          console.log(searchData.stockName);
          return stock.stockName == searchData.stockName; // 내관심종목 여부 확인
        });

        // 내 관심종목 yes? no?
        setIsMyStock(stockExists);
      } catch (error) {
        console.error("내관심종목가져오는 중 에러:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyStocks();
  }, [searchData.stockName]);

  /**관심종목 추가 */
  const handleAddStock = async () => {
    updateData(userId, stockInfoList[0]);
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockName: searchData.stockName }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsMyStock(true);
      } else {
        console.error("추가실패:", result.message);
      }
    } catch (error) {
      console.error("추가 과정 중 에러발생:", error);
    } finally {
      setIsLoading(false);
    }
  };
  /**관심종목 삭제 */
  const handleDeleteStock = async () => {
    updateData(userId, stockInfoList[0]);
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockName: searchData.stockName }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsMyStock(false);
      } else {
        console.error("삭제실패:", result.message);
      }
    } catch (error) {
      console.error("삭제 중 에러발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[496px] w-auto flex flex-col gap-4 ">
      <div className=" w-auto h-6 flex justify-between">
        <BodyFont level="3" weight="medium" className="text-primary-900">
          검색결과
        </BodyFont>
      </div>
      <div className="border w-full h-full flex justify-between ">
        {isLoading ? (
          <div className="w-full items-center h-full flex justify-center">
            <Image src={loadingSpinner} alt="Loading" width={85} height={85} />
          </div>
        ) : (
          <>
            <div className="w-[573px] h-[48px] pt-1">
              <StockItemClient {...stockInfoList[0]} size="sm" />
            </div>
            {isMyStock ? (
              <div className="w-[120px]">
                <TextButton variant="default" size="sm" onClick={handleDeleteStock}>
                  삭제
                </TextButton>
              </div>
            ) : (
              <div className="w-[120px]">
                <TextButton variant="primary" size="sm" onClick={handleAddStock}>
                  추가
                </TextButton>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
