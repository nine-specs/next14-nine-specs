"use client";

import CardWrap from "@/common/CardWrap";
import Title from "../_ui/Title";
import NOTFOUND_ICON from "../../../../../public/images/Not_found_icon.svg";
import BodyFont from "@/common/BodyFont";
import { StockInfo } from "@/components/Report/type/report/stockType";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import RecentlyViewedStockItem from "../_ui/RecentlyViewedStockItem";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";

export default function RecentlyViewed() {
  const [recentlyViewedStocks, setRecentlyViewedStocks] = useState<StockInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDBStock = async (keywords: string[]) => {
    try {
      const data = await (
        await fetch(`${BASE_URL}/api/my/recent`, {
          method: "POST",
          body: JSON.stringify({ recentKeywordList: keywords }),
        })
      ).json();

      setRecentlyViewedStocks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedRecentData = localStorage.getItem("recentData");
    if (!savedRecentData?.length) {
      setLoading(false);
      return;
    }

    // 배열의 keyword 객체를 문자 요소로 변경
    const keywordToStockName = JSON.parse(savedRecentData).map((data: { keyword: string }) => data.keyword);

    // 문자 요소 중복 확인
    const duplicateCheckedArray = keywordToStockName.reduce((acc: string[], curr: string) => {
      !acc.includes(curr) && acc.push(curr);
      return acc;
    }, []);

    fetchDBStock(duplicateCheckedArray);
  }, []);

  const emptyStocks = !recentlyViewedStocks.length;

  return (
    <>
      <div className="flex-1">
        <Title title="최근 조회" />

        <div className="h-[384px]">
          <CardWrap
            width="100%"
            height="100%"
            className={emptyStocks ? "flex flex-col items-center justify-center" : ""}
          >
            {!loading && emptyStocks ? (
              <div className="flex flex-col items-center gap-3">
                <NOTFOUND_ICON />
                <BodyFont level="1" weight="medium" className="text-primary-900">
                  최근 조회한 종목이 없습니다.
                </BodyFont>
              </div>
            ) : (
              <div className="py-8 px-12">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  orientation="vertical"
                  className="w-full"
                >
                  <CarouselContent className="mt-0 h-[320px]">
                    {recentlyViewedStocks.map((stock) => (
                      <CarouselItem key={stock.code} className="py-2 basis-1/4">
                        <RecentlyViewedStockItem {...stock} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
          </CardWrap>
        </div>
      </div>
    </>
  );
}
