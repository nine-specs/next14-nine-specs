"use client";
import { usePwShow } from "@/hooks/common/usePwShow";
import Image from "next/image";
import { useState } from "react";
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  name?: string;
  onChange?: (value: string) => void;
  passwordMatch?: boolean;
}

export default function CheckPwInput({
  type = "password", //기본 속성타입
  placeholder, //속성 text
  value,
  label, //위에 경고 관련 (아이디, 비밀번호)
  description, //입력값 설명
  name,
  onChange,
  children, //필요하면 사용
  className, //스타일 추가 할때 사용
  passwordMatch,
}: InputProps) {
  const { isPasswordShow, togglePasswordShow } = usePwShow();
  const [showDescription, setShowDescription] = useState(false);
  const inputType = type === "password" && isPasswordShow ? "text" : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value); // 입력값을 부모 컴포넌트로 전달
    }
  };
  const handleFocus = () => {
    setShowDescription(true); // 입력 필드에 포커스 시 description 보이기
  };

  // name 이 confirmPassword  이면 C 그게아니면 I

  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
      {label && (
        <label
          className={`block mb-2 ${
            name === "confirmPassword"
              ? passwordMatch
                ? "text-black"
                : "text-warning"
              : "text-black"
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={`self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300 ${
          name === "confirmPassword"
            ? passwordMatch
              ? "border-grayscale-300 [&>input]:text-black"
              : "border-warning [&>input]:text-warning"
            : "border-grayscale-300 [&>input]:text-black"
        }`}
      >
        <input
          className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-400 text-left flex items-center max-w-[314px] p-0"
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
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
      {description && showDescription && (
        <label
          className={`text-sm ${
            name === "confirmPassword"
              ? passwordMatch
                ? "text-grayscale-700"
                : "text-warning"
              : "text-grayscale-700"
          }`}
        >
          {description}
        </label>
      )}
    </div>
  );
}
