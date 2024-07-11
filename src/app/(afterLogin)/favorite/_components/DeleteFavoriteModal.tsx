import BodyFont from "@/common/BodyFont";
import { Modal } from "@/common/Modal";
import CloseIcon from "/public/images/Close_icon.svg";
import React from "react";
import SearchInput from "../../discovery/_components/SearchInput";
import Search_icon from "/public/images/Search_icon.svg";
import ButtonFont from "@/common/ButtonFont";
import TextButton from "@/common/TextButton";

type TAddFavoriteModal = {
  onClose: () => void;
};

export default function DeleteFavoriteModal({ onClose }: TAddFavoriteModal) {
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget);
  };

  return (
    <>
      <Modal size="S1" onClose={onClose} modalClassName="!rounded-3xl">
        <div className="w-full h-full px-8 pt-6 pb-4 flex flex-col items-center gap-8">
          <BodyFont level="2" weight="bold" className="text-primary-900">
            관심 종목을 삭제하겠습니까?
          </BodyFont>
          <div className="flex justify-between gap-2">
            <TextButton variant="default" size="md" className="w-[157px]">
              삭제하기
            </TextButton>
            <TextButton
              variant="primary"
              size="md"
              className="w-[157px]"
              onClick={onClose}
            >
              돌아가기
            </TextButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
