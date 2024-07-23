import HeadingFont from "@/common/HeadingFont";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import React, { Dispatch, SetStateAction, useState } from "react";

import DropDownA from "./DropDownA";
import BodyFont from "@/common/BodyFont";
import Input from "@/common/Input";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { TUser } from "@/app/api/profile/route";
import { BASE_URL } from "@/constants";
interface TDeleteAccount {
  onClose: () => void;
  setModalHandler: Dispatch<SetStateAction<string>>;
  profileData: {
    profileData: TUser | undefined;
    setProfileData: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  };
}
// 회원탈퇴 모달창
export default function DeleteSocialAccount({ onClose, setModalHandler, profileData }: TDeleteAccount) {
  const [password, setPassword] = useState("");
  const [activeBtn, setActiveBtn] = useState<boolean>(false);
  const [reason, setReason] = useState("탈퇴 사유를 선택해주세요"); // 탈퇴 사유
  const reasonState = { reason, setReason };

  // 비밀번호 검증 및 회원탈퇴 진행
  const checkPwd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reason == "탈퇴 사유를 선택해주세요") return alert("탈퇴 사유를 선택해주세요");
    try {
      const response = await fetch(`${BASE_URL}/api/profile/edit`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: profileData?.profileData?.userId }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        await signOut({ callbackUrl: "/accountDeletion" }); //로그아웃 세션무효
      }
    } catch (error) {
      console.log("회원탈퇴 요청 중 에러발생:" + error);
    }
  };

  return (
    <>
      <Modal size="S4" onClose={onClose}>
        <div className="w-full h-full py-[80px] px-[102px] ">
          <div className=" w-[386px] h-[384px] flex flex-col justify-center items-center ">
            <HeadingFont level="3" weight="bold" className="text-primary-900 ">
              회원탈퇴
            </HeadingFont>
            <div className=" w-[386px] h-[184px] mt-[40px] mb-[56px]">
              {/*<<--탈퇴사유 드롭다운-*/}
              <DropDownA reason={reasonState} />
              {/*탈퇴사유 드롭다운-->>*/}
            </div>
            {/* 비밀번호 입력  끝*/}
            <TextButton size="lg" variant="primary" onClick={checkPwd}>
              회원탈퇴
            </TextButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
