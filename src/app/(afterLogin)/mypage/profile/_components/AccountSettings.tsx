import { useState } from "react";
import CheckPassword from "./(AccountSettings_type)/CheckPassword";
import DeleteAccount from "./(AccountSettings_type)/DeleteAccount";
import UpdateUserInfo from "./(AccountSettings_type)/UpdateUserInfo";
import { TUser } from "@/app/api/profile/route";
import UpdateSocialUserInfo from "./(AccountSettings_type)/UpdateSocialUserInfo";
import DeleteSocialAccount from "./(AccountSettings_type)/DeleteSocialAccount";

interface TAccountSetting {
  onClose: () => void;
  profileData: {
    profileData: TUser | undefined;
    setProfileData: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  };
}

// 모달창 핸들러 역할
export default function AccountSetting({ onClose, profileData }: TAccountSetting) {
  const accountType = profileData.profileData?.accountType;
  const [modalHandler, setModalHandler] = useState(accountType == "K" ? "UpdateSocialUserInfo" : "CheckPassword");

  return (
    <>
      {modalHandler == "CheckPassword" && <CheckPassword onClose={onClose} setModalHandler={setModalHandler} />}
      {modalHandler == "UpdateUserInfo" && (
        <UpdateUserInfo onClose={onClose} setModalHandler={setModalHandler} profileData={profileData} />
      )}
      {modalHandler == "UpdateSocialUserInfo" && (
        <UpdateSocialUserInfo onClose={onClose} setModalHandler={setModalHandler} profileData={profileData} />
      )}
      {modalHandler == "DeleteAccount" && (
        <DeleteAccount onClose={onClose} setModalHandler={setModalHandler} profileData={profileData} />
      )}
      {modalHandler == "DeleteSocialAccount" && (
        <DeleteSocialAccount onClose={onClose} setModalHandler={setModalHandler} profileData={profileData} />
      )}
    </>
  );
}
