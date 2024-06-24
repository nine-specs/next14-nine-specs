"use client";

import useFuntion from "@/app/login/_hooks/useFunction";
import Image from "next/image";
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function IdInput({
  type = "text", //기본 속성타입
  placeholder, //속성 text
  value,
  label, //위에 경고 관련 (아이디, 비밀번호)
  description, //입력값 설명
  children, //필요하면 사용
  className, //스타일 추가 할때 사용
}: InputProps) {
  const { isPasswordShow, togglePasswordShow } = useFuntion();
  const inputType = type === "password" && isPasswordShow ? "text" : type;

  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
      {label && <label className="block mb-2">{label}</label>}
      <div className="self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
        <input
          className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-400 text-left flex items-center max-w-[314px] p-0"
          type={inputType}
          placeholder={placeholder}
          value={value}
        />
        <button
          type="button"
          onClick={togglePasswordShow}
          className="flex items-center justify-center h-full"
        >
          <Image
            alt={isPasswordShow ? "Hide Password" : "Show Password"}
            src={
              isPasswordShow
                ? "/images/EyeShow_icon.svg"
                : "/images/EyeHide_icon.svg"
            }
            width={24}
            height={24}
          />
        </button>
      </div>
      {description && <label className="block mt-2">{description}</label>}
    </div>
  );
}
