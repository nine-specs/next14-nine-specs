import HeadingFont from "@/common/HeadingFont";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import React, { Dispatch, SetStateAction, useState } from "react";

import DropDownA from "./DropDownA";
import BodyFont from "@/common/BodyFont";
import Input from "@/common/Input";
import { useRouter } from "next/navigation";
interface TDeleteAccount {
  onClose: () => void;
  setModalHandler: Dispatch<SetStateAction<string>>;
}
// 회원탈퇴 모달창
export default function DeleteAccount({
  onClose,
  setModalHandler,
}: TDeleteAccount) {
  const [password, setPassword] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  let router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
    password.length >= 7 ? setActiveBtn(true) : setActiveBtn(false);
  };
  const checkPwd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await fetch("/api/profile/checkpwd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      });

      const result = await response.json();
      if (response.ok) {
        //임시 비밀번호와 일치시 정보 수정 모달창으로 이동.
        setModalHandler("UpdateUserInfo");
      } else {
        // 비밀번호 틀릴 시 경고창 -> 추후 변경예정
        alert("GET OUT!!");
      }
    } catch (error) {
      console.error("비밀번호 확인 중 에러발생:", error);
    }

    // //임시 비밀번호 설정
    // const loginPassword = "11111111";
    // if (password == loginPassword) {
    //   //임시 비밀번호와 일치시 db에서 삭제.
    //   //회원탈퇴 페이지이동하기
    //   //나중에 서버액션으로 보내고 거기서 페이지이동으로 변경
    //   router.push("/accountDeletion");
    // } else {
    //   // 비밀번호 틀릴 시 경고창 -> 추후 변경예정
    //   alert("GET OUT!!");
    // }
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
              <DropDownA />
              {/*탈퇴사유 드롭다운-->>*/}
              {/* 비밀번호 입력  */}
              <BodyFont
                level="4"
                weight="medium"
                className="text-primary-900 mt-4 mb-1"
              >
                비밀번호 입력
              </BodyFont>
              {/* 비밀번호 */}
              <div className="self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
                <input
                  type="password"
                  className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-400 text-left flex items-center max-w-[314px] p-0"
                  name="pwd"
                  onChange={onChange}
                />
              </div>
            </div>
            {/* 비밀번호 입력  끝*/}
            {activeBtn ? (
              <TextButton size="lg" variant="primary" onClick={checkPwd}>
                회원탈퇴
              </TextButton>
            ) : (
              <TextButton size="lg" className="!text-grayscale-300" disabled>
                회원탈퇴
              </TextButton>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
