import HeadingFont from "@/common/HeadingFont";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import React, { Dispatch, SetStateAction, useState } from "react";

import DropDownA from "./DropDownA";
interface TDeleteAccount {
  onClose: () => void;
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function DeleteAccount({
  onClose,
  setModalHandler,
}: TDeleteAccount) {
  return (
    <>
      <Modal size="S4" onClose={onClose}>
        <div className="w-full h-full py-[80px] px-[102px] ">
          <div className=" w-[386px] h-[384px] flex flex-col justify-center items-center ">
            <HeadingFont level="3" weight="bold" className="text-primary-900 ">
              회원탈퇴
            </HeadingFont>
            {/*<<--탈퇴사유 드롭다운-*/}
            <DropDownA />
            {/*탈퇴사유 드롭다운-->>*/}
            <TextButton size="lg" className="!text-grayscale-300" disabled>
              회원탈퇴
            </TextButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
