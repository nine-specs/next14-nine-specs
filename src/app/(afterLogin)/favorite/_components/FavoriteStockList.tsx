"use client";
import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import FavoriteStockItem from "./FavoriteStockItem";
import { useState } from "react";
import AddFavoriteModal from "./AddFavoriteModal";

type TFavoriteStockList = {
  // 내관심종목 데이터 타입
  data: string[];
  popularSearchData: {
    id: string;
    stockName: string;
  }[];
};

export default function FavoriteStockList({
  data,
  popularSearchData,
}: TFavoriteStockList) {
  const [isAddFavoriteModalOpened, setAddFavoriteModalOpened] = useState(false); // 모달 열고닫기
  return (
    <>
      <div className="w-[1214px] h-auto  flex flex-col justify-between gap-6 mx-auto  mt-[56px]">
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
        <div className="flex flex-col justify-between gap-6">
          {/* 관심종목 리스트 */}
          <div className="w-[1214px] min-h-[360px]  flex  gap-[19px] flex-wrap justify-start">
            {data.map((item, index) => (
              <FavoriteStockItem myStock={item} key={index} />
            ))}
          </div>
        </div>
        {isAddFavoriteModalOpened && (
          <AddFavoriteModal
            onClose={() => setAddFavoriteModalOpened(false)}
            popularSearchData={popularSearchData}
          />
        )}
      </div>
    </>
  );
}
