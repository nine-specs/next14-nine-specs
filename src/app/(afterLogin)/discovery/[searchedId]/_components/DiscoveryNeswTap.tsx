"use client";
import React, { useState } from "react";
import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import { NewsResponse } from "@/types/news";
import RecentStockNewsItem from "./RecentStockNewsItem";

type TDiscoveryNeswTap = {
  relatedNews: NewsResponse[];
};

export default function DiscoveryNeswTap({ relatedNews }: TDiscoveryNeswTap) {
  const [isMore, setIsMore] = useState(false);

  const handleToggle = () => {
    if (relatedNews.length > 6) setIsMore(!isMore);
  };
  return (
    <>
      <div className="w-[590px] h-[288px] flex flex-col">
        <div className="w-[590px] h-[32px] mb-2 flex gap-4">
          <BodyFont level="1" weight="bold" className="text-primary-900">
            뉴스
          </BodyFont>
          <ButtonFont weight="medium" className="border-none text-[#575757] underline !text-[14px] !leading-[20px]">
            ({relatedNews.length})
          </ButtonFont>
        </div>
        <div className="w-full h-auto rounded-lg bg-grayscale-0 p-6 flex flex-col gap-[10px]">
          <div className={`w-full ${isMore ? "h-auto" : "h-[464px]"} overflow-hidden flex flex-col gap-2`}>
            {relatedNews.length > 0 ? (
              relatedNews.map((newsItem) => <RecentStockNewsItem key={newsItem.newsId} {...newsItem} />)
            ) : (
              <div className="flex justify-center h-full items-center">
                <BodyFont level="2" weight="regular" className="text-primary-900">
                  관련 뉴스가 없습니다.
                </BodyFont>
              </div>
            )}
          </div>
          <div
            className="mt-2 w-[542px] h-[40px] border-t border-gray-300 pt-4 px-[10px] text-center  cursor-pointer"
            onClick={handleToggle}
          >
            더보기
          </div>
        </div>
      </div>
    </>
  );
}
