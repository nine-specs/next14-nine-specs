import BodyFont from "@/common/BodyFont";
import CaptionFont from "@/common/CaptionFont";
import CheckIdInput from "@/common/CheckIdInput";
import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import { useState } from "react";
import CheckPassword from "./CheckPassword";

interface TAccountSetting {
  onClose: () => void;
}

export default function AccountSetting({ onClose }: TAccountSetting) {
  const [modalHandler, setModalHandler] = useState("CheckPassword");

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalHandler("3");
  };

  return (
    <>
      {modalHandler == "CheckPassword" && (
        <CheckPassword onClose={onClose} setModalHandler={setModalHandler} />
      )}
      {modalHandler == "2" && (
        <Modal
          size="S6"
          onClose={onClose}
          bgClassName="!absolute !min-h-[1028px] "
          modalClassName="relative  my-[66px] "
        >
          <form className="w-full h-full py-[80px] px-[102px] ">
            <div className="w-[386px] h-[584]px flex flex-col items-center gap-[40px] mb-8">
              <HeadingFont
                level="3"
                weight="bold"
                className="text-primary-900 "
              >
                정보 수정
              </HeadingFont>
              <div className="flex flex-col  gap-[16px] self-stretch ">
                <CheckIdInput
                  label="아이디"
                  placeholder="아이디를 입력해주세요"
                />
                <div>
                  <Input
                    type="password"
                    label="새 비밀번호 입력"
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <CaptionFont
                    weight="medium"
                    className="text-grayscale-700 mt-0"
                  >
                    * 8~20자 이내 숫자,특수문자,영문자 주 2가지 이상 조합
                  </CaptionFont>
                </div>
                <Input
                  type="password"
                  label="새 비밀번호 확인"
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                <Input
                  type="tel"
                  label="휴대폰번호"
                  placeholder="휴대폰번호를 입력해주세요"
                />
                <Input
                  placeholder="생년월일 6자를 입력해주세요"
                  label="생년월일"
                />
              </div>
            </div>
            <div className="w-[386px] flex flex-col items-center gap-2">
              <TextButton disabled type="submit">
                수정하기
              </TextButton>
              <button onClick={onClick}>
                <CaptionFont weight="regular" className="text-warning">
                  회원탈퇴
                </CaptionFont>
              </button>
            </div>
          </form>
        </Modal>
      )}
      {modalHandler == "3" && (
        <Modal size="S4" onClose={onClose}>
          <div className="w-full h-full py-[80px] px-[102px] ">
            <div className=" w-[386px] h-[384px] flex flex-col justify-center items-center ">
              <HeadingFont
                level="3"
                weight="bold"
                className="text-primary-900 "
              >
                회원탈퇴
              </HeadingFont>
              {/*<<--인풋박스-*/}
              <div className=" w-[386px] h-[184px] mt-[40px] mb-[56px]">
                <BodyFont
                  level="4"
                  weight="medium"
                  className="text-primary-900 mb-1"
                >
                  회원탈퇴 사유
                </BodyFont>
                <Input type=""></Input>
                <BodyFont
                  level="4"
                  weight="medium"
                  className="text-primary-900 mt-4 mb-1"
                >
                  비밀번호 입력
                </BodyFont>
                <Input type="password"></Input>
              </div>
              {/*인풋박스-->>*/}
              <TextButton size="lg" className="!text-grayscale-300" disabled>
                회원탈퇴
              </TextButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
