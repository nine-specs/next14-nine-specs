import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import React, { useState } from "react";
import AddFavoriteModal from "./AddFavoriteModal";

type TFavoriteTitleSection = {
  popularSearchData: {
    id: string;
    stockName: string;
  }[];
};

export default function FavoriteTitleSection({
  popularSearchData,
}: TFavoriteTitleSection) {
  const [isAddFavoriteModalOpened, setAddFavoriteModalOpened] = useState(false); // 모달 열고닫기
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
        />
      )}
    </>
  );
}
