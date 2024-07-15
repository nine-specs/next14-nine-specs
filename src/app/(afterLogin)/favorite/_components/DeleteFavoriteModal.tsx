import BodyFont from "@/common/BodyFont";
import { Modal } from "@/common/Modal";
import React from "react";
import TextButton from "@/common/TextButton";
import { deleteMyStocks } from "@/hooks/profile/useStocksHandler";

type TAddFavoriteModal = {
  onClose: () => void;
  stock: string;
};

export default function DeleteFavoriteModal({
  onClose,
  stock,
}: TAddFavoriteModal) {
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget);
  };

  // 클릭시 삭제이벤트 진행
  const onDeleteClick = () => {
    deleteMyStocks(stock, "option");
  };
  return (
    <>
      <Modal size="S1" onClose={onClose} modalClassName="!rounded-3xl">
        <div className="w-full h-full px-8 pt-6 pb-4 flex flex-col items-center gap-8">
          <BodyFont level="2" weight="bold" className="text-primary-900">
            관심 종목을 삭제하시겠습니까?
          </BodyFont>
          <div className="flex justify-between gap-2">
            <div className="w-[157px]" onClick={onDeleteClick}>
              <TextButton variant="default" size="md">
                삭제하기
              </TextButton>
            </div>
            <div className="w-[157px]">
              <TextButton variant="primary" size="md" onClick={onClose}>
                돌아가기
              </TextButton>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
