"use client";
import React, { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingPage from "@/common/LoadingPage";
import useVerifyToken from "@/hooks/sign/useVerifyToken";
import useFormStore from "@/store/useFormStore";
import HeadingFont from "@/common/HeadingFont";
import ProfileSVG from "/public/images/profile.svg";
import EditLgIcon from "/public/images/Edit_icon_lg.svg";
import CheckIdEmailInput from "@/common/CheckIdEmailInput";
import TextButton from "@/common/TextButton";
import DropDownC from "./DropDownC";
import useSignUp from "@/hooks/sign/useSignUp";

export default function profiletest() {
  const { name, userId, password, email, phone, birthdate } = useFormStore();
  console.log(name)
  console.log(userId)
  console.log(password)
  console.log(email)
  console.log(phone)
  console.log(birthdate)
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isTokenValid } = useVerifyToken(token);
  const { signUp } = useSignUp();

  if (!isTokenValid) {
    return <LoadingPage />;
  }

  // 프로필 아이콘 클릭시 숨겨진 input이 클릭
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 이미지 파일 업로드 시 실행 이벤트
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const selectedFile = files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validImageTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= 500000) {
          setFile(selectedFile);
        } else {
          alert("파일 크기는 500KB 이하로 업로드할 수 있습니다.");
        }
      } else {
        alert("이미지 파일만 업로드할 수 있습니다.");
      }
    }
  };

  // 회원 가입 폼 제출 처리
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // signUp 함수 호출
    const result = await signUpUser();
  
    if (result.success) {
      // 회원 가입 성공 시 처리
      console.log("회원 가입 및 프로필 설정 성공!");
    } else {
      // 회원 가입 실패 시 처리
      console.error("회원 가입 및 프로필 설정 실패:", result.error);
    }
  };

  // signUpUser 함수 정의
  const signUpUser = async () => {
    return await signUp(
      name,
      userId,
      password,
      email,
      phone,
      birthdate,
      "", // nick: 닉네임
      [], // interests: 관심종목
      file,
    );
  };

  return (
    <>
      <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 rounded-[32px] bg-white w-[590px] h-[688px] mx-auto mt-[120px]">
        <form
          onSubmit={handleSignUp}
          className="w-full h-full py-[80px] px-[102px]"
        >
          <div className="w-auto h-auto flex flex-col justify-center items-center">
            <HeadingFont level="3" weight="bold" className="text-primary-900">
              프로필 설정
            </HeadingFont>
            <div className=" w-[386px] h-[328px] mt-[40px] mb-[56px] flex flex-col justify-center items-center">
              <div className="w-[120px] h-[120px] mb-[24px] relative flex justify-center items-center">
                <button onClick={handleClick}>
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProfileSVG />
                  )}
                  <EditLgIcon className="absolute bottom-0 right-0 " />
                </button>
                <input
                  type="file"
                  className="hidden"
                  name="file"
                  ref={fileInputRef}
                  onChange={onFileChange}
                />
              </div>
              <div
                className="w-[384px] h-[184px] flex flex-col gap-[16px] justify-between"
                id="inputBox"
              >
                <CheckIdEmailInput
                  label="닉네임"
                  name="nick"
                  checkLabel="중복 확인"
                  placeholder="닉네임을 입력해주세요"
                  description=" "
                />
                <DropDownC />
              </div>
            </div>
            <TextButton variant="primary" size="lg" type="submit">
              가입하기
            </TextButton>
          </div>
        </form>
      </div>
    </>
  );
}
