import CaptionFont from "@/common/CaptionFont";
import CheckIdEmailInput from "@/common/CheckIdEmailInput";
import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import React, { Dispatch, SetStateAction } from "react";

interface TUpdateUserInfo {
  onClose: () => void;
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function UpdateUserInfo({
  onClose,
  setModalHandler,
}: TUpdateUserInfo) {
  // 회원탈퇴 이동 클릭이벤트
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalHandler("DeleteAccount");
  };

  return (
    <Modal
      size="S6"
      onClose={onClose}
      bgClassName="!absolute !min-h-[1028px] "
      modalClassName="relative  my-[66px] "
    >
      <form className="w-full h-full py-[80px] px-[102px] ">
        <div className="w-[386px] h-[584]px flex flex-col items-center gap-[40px] mb-8">
          <HeadingFont level="3" weight="bold" className="text-primary-900 ">
            정보 수정
          </HeadingFont>
          <div className="flex flex-col  gap-[16px] self-stretch ">
            {/* 아이디 입력 하는곳 시작 */}
            <CheckIdEmailInput
              label="아이디"
              name="userId"
              description="* 6~12자의 영문,숫자,_를 이용한 조합"
              checkLabel="중복 확인"
              placeholder="아이디를 입력해주세요"
            />
            {/* 아이디 입력 하는곳 끝 */}
            <div>
              <Input
                type="password"
                label="새 비밀번호 입력"
                placeholder="비밀번호를 입력해주세요"
              />
              <CaptionFont weight="medium" className="text-grayscale-700 mt-0">
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
            <Input placeholder="생년월일 6자를 입력해주세요" label="생년월일" />
          </div>
        </div>
        <div className="w-[386px] flex flex-col items-center gap-2">
          <TextButton disabled type="submit">
            수정하기
          </TextButton>
          <button onClick={onClick}>
            <CaptionFont weight="regular" className="text-warning underline">
              회원탈퇴
            </CaptionFont>
          </button>
        </div>
      </form>
    </Modal>
  );
}