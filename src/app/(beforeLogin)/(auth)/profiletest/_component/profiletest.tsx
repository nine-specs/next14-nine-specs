"use client";
import React, { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingPage from "@/common/LoadingPage";
import useVerifyToken from "@/hooks/sign/useVerifyToken";
import useFormStore from "@/store/useFormStore";
import HeadingFont from "@/common/HeadingFont";
import ProfileSVG from "/public/images/profile.svg";
import EditLgIcon from "/public/images/Edit_icon_lg.svg";

import TextButton from "@/common/TextButton";
import DropDownC from "./DropDownC";
// import signUp2 from "@/hooks/sign/useSignUp2";
import signUp from "@/hooks/sign/useSignUp";
import CheckIdNickInput from "@/common/CheckIdNickInput";
import router from "next/router";
import { useNickCheck } from "@/hooks/common/useNickCheck";

export interface DropDownCProps {
  myStock: string;
  setMyStock: React.Dispatch<React.SetStateAction<string>>;
  showDropDown: boolean;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  selectOption: (e: React.MouseEvent<HTMLSpanElement>) => void;
  // giveStock: (value: string) => void;
  myStockArr: string[];
  setStockArr: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProfileTest() {
  const { name, userId, password, email, phone, birthdate } = useFormStore();
  const [myStockArr, setStockArr] = useState<string[]>([]);
  const [myStock, setMyStock] = useState<string>(""); //
  const [showDropDown, setShowDropDown] = useState(false); //
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isTokenValid } = useVerifyToken(token);
  if (!isTokenValid) {
    return <LoadingPage />;
  }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nick = e.currentTarget.nick.value;
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("nick", nick);
    formData.append("myStock", myStock);

    const data = {
      name,
      userId,
      password,
      email,
      phone,
      birthdate,
      nick,
      // myStock,
    };
    const response = await signUp(data, formData);
    if (response.success) {
      alert("회원 가입 및 프로필 설정 성공!");
      router.push("/login");
    } else {
      alert(response.error);
    }
  };
  //드롭다운 종목선택 이벤트
  const selectOption = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setMyStock(" ");
    const target = e.target as HTMLSpanElement;
    const text = target.innerText;
    const stockNameText = text.split("∙")[0].trim().split("#")[1].trim();
    console.log("addStockArr : " + myStockArr);
    console.log("stockNameText : " + stockNameText);
    // 선택된 주식종목은 최대 4개까지만 표시
    let copyArr: string[] = [];
    if (myStockArr.length < 4) {
      //기존 관심종목배열 복사
      copyArr = [...myStockArr];
      copyArr.push("#" + stockNameText);
      // 중복이 있다면 제거
      copyArr = removeDuplicates(copyArr);
      setStockArr(copyArr);
    }

    // input value에 선택된 주식종목 설정
    const addStocksStr = copyArr.join(" ");
    setMyStock(addStocksStr);
    console.log("선택된종목배열:" + myStockArr);
    // giveStock(myStock);
    // '#' 비우기
    const input = document.getElementById("stockInput") as HTMLInputElement;
    input.value = "";
    setShowDropDown(false);
  };
  //배열 중복제거
  const removeDuplicates = (arr: string[]): string[] => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  const dropDownProps: DropDownCProps = {
    myStock,
    setMyStock,
    showDropDown,
    setShowDropDown,
    selectOption,
    myStockArr,
    setStockArr,
  };

  const { nick, setNick, styleStatus, descriptionText, handleNickCheck } =
    useNickCheck();

  return (
    <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 rounded-[32px] bg-white w-[590px] h-[688px] mx-auto ">
      <form
        onSubmit={handleSubmit}
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
              <CheckIdNickInput
                label="닉네임"
                name="nick"
                checkLabel="중복 확인"
                placeholder="닉네임을 입력해주세요"
                description=""
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                onCheckId={handleNickCheck}
                styleStatus={styleStatus}
                descriptionText={descriptionText}
              />
              <DropDownC {...dropDownProps} />
            </div>
          </div>
          <TextButton variant="primary" size="lg" type="submit">
            가입하기
          </TextButton>
        </div>
      </form>
    </div>
  );
}
