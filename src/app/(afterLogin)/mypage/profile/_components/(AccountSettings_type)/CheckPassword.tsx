import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TCheckPassword {
  onClose: () => void;
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function CheckPassword({
  onClose,
  setModalHandler,
}: TCheckPassword) {
  // 비밀번호 스테이트 저장 -> 추후 변경
  const [password, setPassword] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);

  // 입력된 비밀번호가 8자리 이상일시 버튼 활성화 //
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    password.length >= 7 ? setActiveBtn(true) : setActiveBtn(false);
  };

  // 비밀번호 검증
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
        console.log(result.message);
      } else {
        // 비밀번호 틀릴 시 경고창 -> 추후 변경예정
        alert("현재 비밀번호와 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("비밀번호 확인 중 에러발생:", error);
    }

    // const loginPassword = "11111111";
    // if (password == loginPassword) {
    //   //임시 비밀번호와 일치시 정보 수정 모달창으로 이동.
    //   setModalHandler("UpdateUserInfo");
    // } else {
    //   // 비밀번호 틀릴 시 경고창 -> 추후 변경예정
    //   alert("GET OUT!!");
    // }
  };
  return (
    <>
      <Modal size="S3" onClose={onClose}>
        {/*비밀번호 인증*/}
        <div className="w-full h-full py-[80px] px-[102px] ">
          <div className=" w-[386px] h-[284px] flex flex-col justify-center items-center ">
            <HeadingFont level="3" weight="bold" className="text-primary-900 ">
              비밀번호 인증
            </HeadingFont>
            {/* 비밀번호 */}
            <div className="w-[384px] h-[184px] flex flex-col gap-[16px]  mt-[40px] mb-[56]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
                <label className="block mb-2">현재 비밀번호 입력</label>
                <div className="self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
                  <input
                    type="password"
                    className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-400 text-left flex items-center max-w-[314px] p-0"
                    name="pwd"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            {/* 비밀번호 8자리 이상입력시 활성화된 버튼을 표시 */}
            {activeBtn ? (
              <TextButton size="lg" variant="primary" onClick={checkPwd}>
                확인
              </TextButton>
            ) : (
              <TextButton size="lg" disabled>
                확인
              </TextButton>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
