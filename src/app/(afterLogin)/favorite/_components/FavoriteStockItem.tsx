"use client";
import TextButton from "@/common/TextButton";
import Link from "next/link";
import React from "react";

type TFavoriteStockItemProps = {
  myStock: string;
};

export default function FavoriteStockItem({
  myStock,
}: TFavoriteStockItemProps) {
  const encodedMyStock = encodeURIComponent(myStock);
  return (
    <>
      <div className="w-[392px] h-[360px] bg-grayscale-0 rounded-2xl px-8 pt-8">
        <div className="flex flex-col justify-between gap-4">
          <div className="w-full h-[56px] bg-slate-100">{myStock}</div>
          <div className="w-full h-[168px] bg-slate-100"></div>
        </div>
        <div className="py-4 flex justify-between gap-2">
          <TextButton size="md" variant="default" className="w-[160px]">
            삭제하기
          </TextButton>
          <Link href={`/report/${encodedMyStock}`} className="w-full">
            <TextButton size="md" variant="primary" className="w-[160px]">
              자세히보기
            </TextButton>
          </Link>
        </div>
      </div>
    </>
  );
}
