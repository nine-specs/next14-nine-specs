"use client";
import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import TextButton from "@/common/TextButton";
import ProfileSVG from "/public/images/profile.svg";
import EditLgIcon from "/public/images/Edit_icon_lg.svg";
import { useEffect, useRef, useState } from "react";

import jwt from "jsonwebtoken";
import { useRouter, useSearchParams } from "next/navigation";
import CheckIdNickInput from "@/common/CheckIdNickInput";
import { useNickCheck } from "@/hooks/common/useNickCheck";
import DropDownC from "../../../profiletest/_component/DropDownC";
import { Modal } from "@/common/Modal";
import { SocialSignUp } from "@/hooks/sign/useSocialSign";
import { useSocialSignHandle } from "@/hooks/sign/useSocialSignHandle";
import Image from "next/image";

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

export default function Social() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [userInfo, setUserInfo] = useState<{
    id: string;
    name: string;
    email: string;
    image: string;
    provider: string;
  } | null>(null);

  useEffect(() => {
    if (token) {
      try {
        // jwt.decode를 사용하여 토큰을 디코딩합니다.
        const decodedToken = jwt.decode(token) as {
          id: string;
          name: string;
          email: string;
          image: string;
          provider: string;
        };

        setUserInfo({
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
          image: decodedToken.image,
          provider: decodedToken.provider,
        });

        console.log("Decoded Token: ", decodedToken);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [token]);

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const { nick, setNick, styleStatus, descriptionText, handleNickCheck } = useNickCheck();

  const [myStockArr, setStockArr] = useState<string[]>([]);
  const [myStock, setMyStock] = useState<string>(""); //
  const [showDropDown, setShowDropDown] = useState(false); //

  //드롭다운 종목선택 이벤트
  const selectOption = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setMyStock(" ");
    const target = e.target as HTMLSpanElement;
    const text = target.innerText;
    const stockNameText = text.split("∙")[0].trim().split("#")[1].trim();
    console.log("addStockArr : " + myStockArr);
    console.log("stockNameText : " + stockNameText);
    // 선택된 주식종목은 최대 6개까지만 표시
    let copyArr: string[] = [];
    if (myStockArr.length < 6) {
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

  const { showModal, handleModalClose, handleSubmit } = useSocialSignHandle({
    userInfo,
    nick,
    myStockArr,
    file,
  });

  return (
    <>
      <section className=" flex flex-row items-center justify-center py-0 px-5 box-border  my-12">
        <form
          className="flex flex-col items-center justify-start m-0 w-[590px] h-[668px]shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0  py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border border "
          onSubmit={handleSubmit}
        >
          <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
            {/* 타이틀 영역 시작  */}
            <HeadingFont level="3" weight="bold" className="text-primary-900">
              간편 회원가입
            </HeadingFont>
            <div className="w-[120px] h-[120px] mb-[24px] relative flex justify-center items-center">
              <button onClick={handleClick}>
                {file ? (
                  <Image src={URL.createObjectURL(file)} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : userInfo?.image ? (
                  <Image src={userInfo.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <ProfileSVG />
                )}
                <EditLgIcon className="absolute bottom-0 right-0 " />
              </button>
              <input type="file" className="hidden" name="file" ref={fileInputRef} onChange={onFileChange} />
            </div>

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

            <Input
              placeholder="-를 제외한 휴대폰번호를 입력해주세요"
              label="휴대폰번호"
              name="phone"
              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
            />
            {/* 휴대폰번호 입력 끝 */}

            {/* 생년월일 입력 시작 */}
            <Input
              placeholder="생년월일 6자를 입력해주세요(예시:990101)"
              label="생년월일"
              name="birthdate"
              //value={birthdate}
              //onChange={(e) => setBirthdate(e.target.value)}
              maxLength={6}
            />

            <DropDownC {...dropDownProps} />
          </div>
          <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
            <TextButton>가입</TextButton>
          </div>
        </form>

        {showModal && (
          <Modal size="S2" onClose={handleModalClose}>
            <div className="flex flex-col justify-center items-center p-4">
              <HeadingFont level="4" weight="bold" className="mb-2">
                회원가입 성공
              </HeadingFont>
              <p className="mb-4">회원 가입 및 프로필 설정이 성공적으로 완료되었습니다!</p>
              <TextButton variant="primary" size="lg" onClick={handleModalClose}>
                확인
              </TextButton>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}
