import BodyFont from "@/common/BodyFont";
import { Modal } from "@/common/Modal";
import React from "react";
import TextButton from "@/common/TextButton";
import { deleteMyStocks } from "@/hooks/profile/useStocksHandler";
import { useRouter } from "next/navigation";

type TAddFavoriteModal = {
  onClose: () => void;
  stock: string;
};

export default function DeleteFavoriteModal({
  onClose,
  stock,
}: TAddFavoriteModal) {
  const router = useRouter();

  // 클릭시 삭제이벤트 진행
  const onDeleteClick = async () => {
    try {
      const response = await fetch("/api/favorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockName: stock, option: "option" }),
      });
      const result = await response.json();
      if (response.ok) {
        router.refresh();
      } else {
        console.error("삭제실패:", result.message);
      }
    } catch (error) {
      console.error("삭제 중 에러발생:", error);
    }
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
