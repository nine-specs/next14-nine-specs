"use client";
import TextButton from "@/common/TextButton";
import Link from "next/link";
import React, { useState } from "react";
import DeleteFavoriteModal from "./DeleteFavoriteModal";

type TFavoriteStockItemProps = {
  myStock: string;
};

export default function FavoriteStockButtons({
  myStock,
}: TFavoriteStockItemProps) {
  const encodedMyStock = encodeURIComponent(myStock);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  // 삭제하기 모달창 띄우기
  const onDeleteClick = () => setShowDeleteModal(!isShowDeleteModal);
  return (
    <>
      <div className="py-4 flex justify-between gap-2 w-[392px] h-[88px]">
        <TextButton
          size="md"
          variant="default"
          className="w-[160px]"
          onClick={onDeleteClick}
        >
          삭제하기
        </TextButton>
        <Link href={`/report/${encodedMyStock}`} className="w-full">
          <TextButton size="md" variant="primary" className="w-[160px]">
            자세히보기
          </TextButton>
        </Link>
      </div>
      {isShowDeleteModal && (
        <DeleteFavoriteModal
          stock={myStock}
          onClose={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
}
