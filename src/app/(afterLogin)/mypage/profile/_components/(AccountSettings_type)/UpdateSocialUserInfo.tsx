import { TUser } from "@/app/api/profile/route";
import CaptionFont from "@/common/CaptionFont";
import CheckIdNickInput from "@/common/CheckIdNickInput";
import CheckPwInput from "@/common/CheckPwInput";
import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import { useFormCheck } from "@/hooks/common/useFormCheck";
import { UpdateUser } from "@/hooks/profile/useGetUser";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";

interface TUpdateUserInfo {
  onClose: () => void;
  setModalHandler: Dispatch<SetStateAction<string>>;
  profileData: {
    profileData: TUser | undefined;
    setProfileData: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  };
}

export default function UpdateSocialUserInfo({ onClose, setModalHandler, profileData }: TUpdateUserInfo) {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [phone, setPhone] = useState(profileData.profileData?.phone);
  const [birthdate, setBirthdate] = useState(profileData.profileData?.birthdate);
  const birthdateRef = useRef;
  const phoneRef = useRef;
  const { handlePasswordChange, handleConfirmPasswordChange, passwordMatch } = useFormCheck("");

  // 회원탈퇴 이동 클릭이벤트
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalHandler("DeleteSocialAccount");
  };

  // 기본 유효성 검사
  const checkActive = (e: React.FormEvent<HTMLFormElement>) => {
    let phoneLength = e.currentTarget.phone.value.length;
    let birthLength = e.currentTarget.birthdate.value.length;
    if (phoneLength == 11 || birthLength == 6) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  };

  //**비밀번호,폰,생년월일 업데이트*/
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    let phone = e.currentTarget.phone.value;
    if (!phone) phone = profileData.profileData?.phone;
    formData.append("phone", phone);

    let birthdate = e.currentTarget.birthdate.value;
    if (!birthdate) birthdate = profileData.profileData?.birthdate;
    formData.append("birthdate", birthdate);

    // 업데이트 실행
    UpdateUser(formData);
  };

  return (
    <Modal size="S4" onClose={onClose} bgClassName="!absolute !min-h-[1028px] " modalClassName="relative  my-[66px] ">
      <form onSubmit={handleSubmit} className="w-full h-full py-[80px] px-[102px] " onChange={checkActive}>
        <div className="w-[386px] h-[584]px flex flex-col items-center gap-[40px] mb-8">
          {/* 모달 타이틀  */}
          <HeadingFont level="3" weight="bold" className="text-primary-900 ">
            정보 수정
          </HeadingFont>
          <div className="flex flex-col  gap-[16px] self-stretch ">
            {/* 사용자 입력창 */}
            <Input
              type="tel"
              label="휴대폰번호"
              name="phone"
              placeholder={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Input
              placeholder={birthdate}
              name="birthdate"
              label="생년월일"
              type="text"
              onChange={(e) => {
                setBirthdate(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-[386px] flex flex-col items-center gap-2">
          {/* 수정 버튼 */}
          <TextButton type="submit" variant={isBtnActive ? "primary" : "default"} disabled={!isBtnActive}>
            수정하기
          </TextButton>
          <button onClick={onClick}>
            {/* 탈퇴 버튼 */}
            <CaptionFont weight="regular" className="text-warning underline">
              회원탈퇴
            </CaptionFont>
          </button>
        </div>
      </form>
    </Modal>
  );
}
