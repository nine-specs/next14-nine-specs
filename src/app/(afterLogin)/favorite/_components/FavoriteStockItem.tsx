"use client";
import TextButton from "@/common/TextButton";
import Link from "next/link";
import React, { useState } from "react";
import DeleteFavoriteModal from "./DeleteFavoriteModal";
import FavoriteStockButtons from "./FavoriteStockButtons";

type TFavoriteStockItemProps = {
  myStock: string;
};

export default function FavoriteStockItem({
  myStock,
}: TFavoriteStockItemProps) {
  // 전달할 파라미터 인코딩

  return (
    <>
      <div className="w-[392px] h-[360px] bg-grayscale-0 rounded-2xl px-8 pt-8">
        <div className="flex flex-col justify-between gap-4">
          <div className="w-full h-[56px] bg-slate-100">{myStock}</div>
          <div className="w-full h-[168px] bg-slate-100"></div>
        </div>
        <FavoriteStockButtons myStock={myStock} />
      </div>
    </>
  );
}
