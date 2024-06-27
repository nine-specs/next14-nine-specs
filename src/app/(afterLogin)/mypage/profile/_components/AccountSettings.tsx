import BodyFont from "@/common/BodyFont";
import CaptionFont from "@/common/CaptionFont";
import CheckIdInput from "@/common/CheckIdInput";
import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import { useState } from "react";
import CheckPassword from "./(AccountSettings_type)/CheckPassword";
import DeleteAccount from "./(AccountSettings_type)/DeleteAccount";
import UpdateUserInfo from "./(AccountSettings_type)/UpdateUserInfo";

interface TAccountSetting {
  onClose: () => void;
}

export default function AccountSetting({ onClose }: TAccountSetting) {
  const [modalHandler, setModalHandler] = useState("CheckPassword");

  return (
    <>
      {modalHandler == "CheckPassword" && (
        <CheckPassword onClose={onClose} setModalHandler={setModalHandler} />
      )}
      {modalHandler == "UpdateUserInfo" && (
        <UpdateUserInfo onClose={onClose} setModalHandler={setModalHandler} />
      )}
      {modalHandler == "DeleteAccount" && (
        <DeleteAccount onClose={onClose} setModalHandler={setModalHandler} />
      )}
    </>
  );
}
