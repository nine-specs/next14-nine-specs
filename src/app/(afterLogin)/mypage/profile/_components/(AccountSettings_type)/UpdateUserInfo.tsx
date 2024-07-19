import { TUser } from "@/app/api/profile/route";
import CaptionFont from "@/common/CaptionFont";
import CheckIdNickInput from "@/common/CheckIdNickInput";
import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import { UpdateUser } from "@/hooks/profile/useGetUser";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TUpdateUserInfo {
  onClose: () => void;
  setModalHandler: Dispatch<SetStateAction<string>>;
  profileData: {
    profileData: TUser | undefined;
    setProfileData: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  };
}

export default function UpdateUserInfo({
  onClose,
  setModalHandler,
  profileData,
}: TUpdateUserInfo) {
  const [phone, setPhone] = useState(profileData.profileData?.phone);
  const [birthdate, setBirthdate] = useState(
    profileData.profileData?.birthdate,
  );

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
      <form action={UpdateUser} className="w-full h-full py-[80px] px-[102px] ">
        <div className="w-[386px] h-[584]px flex flex-col items-center gap-[40px] mb-8">
          <HeadingFont level="3" weight="bold" className="text-primary-900 ">
            정보 수정
          </HeadingFont>
          <div className="flex flex-col  gap-[16px] self-stretch ">
            {/* 아이디 입력 하는곳 끝 */}
            <div>
              <Input
                label="아이디"
                type="text"
                disabled={true}
                placeholder={profileData.profileData?.userId}
              />
              <Input
                label="비밀번호"
                type="password"
                name="password"
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
              name="phone"
              placeholder="휴대폰번호를 입력해주세요"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Input
              placeholder="생년월일 6자를 입력해주세요"
              name="birthdate"
              label="생년월일"
              type="text"
              value={birthdate}
              onChange={(e) => {
                setBirthdate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-[386px] flex flex-col items-center gap-2">
          <TextButton type="submit">수정하기</TextButton>
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
