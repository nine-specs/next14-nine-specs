// import { StockCarousel } from "@/app/(afterLogin)/home/_ui/StockCarousel";
import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import StockItem from "@/common/StockItem/StockItem";
import { StockInfo } from "@/components/Report/type/report/stockType";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { BASE_URL } from "@/constants";
import { stockListByStockName } from "@/hooks/discovery/useSearchAction";
import { TStocks } from "@/hooks/profile/useStocksHandler";
import React, { useEffect, useRef, useState } from "react";
import { TstockInfoList } from "../FavoriteStockLists";
import { useRecentKeywordStore } from "@/store/useRecentKeywordStore";

type Tprops = {
  recentData: TstockInfoList;
};

export default function SlideRecentStocks({ recentData }: Tprops) {
  const { recentKeywordList, setRecentKeywordList } = useRecentKeywordStore(); //

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
            <CarouselContent className="mt-0 h-[96px] gap-5">
              {recentData.map((stock, index) => (
                <div
                  key={index}
                  className="border border-primary-100  rounded-2xl min-w-[255px] min-h-[96px] flex-shrink-0 py-6 pr-4"
                >
                  <CarouselItem key={stock.code} className=" basis-4/4">
                    <StockItem {...stock} size="md" />
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
