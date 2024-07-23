import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { stockListByStockName } from "@/hooks/discovery/useSearchAction";
import React, { useEffect, useState } from "react";
import { TstockInfoList } from "../FavoriteStockLists";
import { TrecentData, useRecentKeywordStore } from "@/store/useRecentKeywordStore";
import StockItemClient from "./StockItemClient";

export default function SlideRecentStocks() {
  const { recentKeywordList, setRecentKeywordList } = useRecentKeywordStore(); //
  const [stockInfoList, setStockInfoList] = useState<TstockInfoList>([]);
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

  /**최근 검색어 모두삭제 클릭이벤트 */
  const deleteAllRecentWord = () => {
    localStorage.setItem("recentData", JSON.stringify([]));
    // 스테이트 변경
    setRecentKeywordList([]);
  };

  return (
    <>
      {recentKeywordList.length >= 1 && (
        <div className="h-[140px] w-auto flex flex-col gap-4 ">
          <div className=" w-auto h-6 flex justify-between">
            <BodyFont level="3" weight="medium" className="text-primary-900">
              최근 검색한 종목
            </BodyFont>
            <ButtonFont
              weight="medium"
              className="border-none text-[#575757] underline !text-[14px] !leading-[20px] "
              onClick={deleteAllRecentWord}
            >
              전체삭제
            </ButtonFont>
          </div>
          {/* 뷰포트영역 */}
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="horizontal"
            className="w-full"
          >
            <CarouselContent className="mt-0 h-[96px] gap-5  px-4">
              {stockInfoList.map((stock, index) => (
                <div
                  key={index}
                  className="border border-primary-100  rounded-2xl min-w-[255px] min-h-[96px] flex-shrink-0 py-6 pr-4"
                >
                  <CarouselItem key={stock.code} className=" basis-4/4">
                    <StockItemClient {...stock} size="md" />
                  </CarouselItem>
                </div>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </>
  );
}
