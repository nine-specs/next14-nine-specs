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

export default function profiletest() {
  const { name,userId, password,email, phone, birthdate } = useFormStore();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(name);
  console.log(userId);
  console.log(email);
  console.log(phone);
  console.log(birthdate);
  console.log(password);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isTokenValid } = useVerifyToken(token);

  if (!isTokenValid) {
    return <LoadingPage />;
  }

  //프로필 아이콘 클릭시 숨겨진 input이 클릭
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const inputBox = document.getElementById("inputBox");
    console.log(inputBox?.querySelector("input"));
    e.preventDefault();
    // 참조 이상없는지 확인
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // 이미지파일 업로드 시 실행 이벤트
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 업로드 된 파일 가져오기
    const { files } = e.target;
    //선택된 하나의 파일이 존재할 때 file 스테이트에 파일을 저장
    if (files && files.length == 1) {
      const selectedFile = files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validImageTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= 500000) {
          // 500KB 이하로 제한
          setFile(selectedFile);
        } else {
          alert("파일 크기는 500KB 이하로 업로드할 수 있습니다.");
        }
      } else {
        alert("이미지 파일만 업로드할 수 있습니다.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 rounded-[32px] bg-white w-[590px] h-[688px] mx-auto mt-[120px]">
        <form action="" className="w-full h-full py-[80px] px-[102px] ">
          <div className="w-auto h-auto flex flex-col justify-center items-center">
            <HeadingFont level="3" weight="bold" className="text-primary-900">
              프로필 설정
            </HeadingFont>
            <div className=" w-[386px] h-[328px]  mt-[40px] mb-[56px] flex flex-col justify-center items-center">
              <div className="w-[120px] h-[120px] mb-[24px] relative flex justify-center items-center">
                <button onClick={handleClick}>
                  {file ? ( //업로드한 파일있다면 미리보기 표시
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProfileSVG /> // 업로드파일이 없다면 기본프사
                  )}
                  <EditLgIcon className="absolute bottom-0 right-0 " />
                </button>
                {/* 숨긴 파일타입 input  */}
                <input
                  type="file"
                  className="hidden" // display:none 적용
                  name="file"
                  ref={fileInputRef} //ref로 참조
                  onChange={onFileChange} // 업로드된 파일 state 보관
                ></input>
              </div>
              <div
                className="w-[384px] h-[184px] flex flex-col gap-[16px] justify-between"
                id="inputBox"
              >
                {/* 닉네임 수정 */}
                <CheckIdEmailInput
                  label="닉네임"
                  name="nick"
                  checkLabel="중복 확인"
                  placeholder="닉네임을 입력해주세요"
                  description=" "
                />
                {/* 닉네임 수정 끝*/}
                {/* 관심종목 */}
                <DropDownC />
                {/* 관심종목 끝 */}
              </div>
            </div>
            <TextButton variant="primary" size="lg">
              가입하기
            </TextButton>
          </div>
        </form>
      </div>
    </>
  );
}
