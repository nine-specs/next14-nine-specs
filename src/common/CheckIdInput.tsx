"use client";
import { useCheckInputEmpty } from "@/hooks/common/useFunction";
import { useFunction } from "@/hooks/common/useIdCheck";
import { useState, useEffect } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  description?: string;
  checkLabel?: string;
  className?: string;
  children?: React.ReactNode;
  name?: string;
}

export default function CheckIdInput({
  type = "text", // 기본 속성 타입
  placeholder, // 속성 text
  value,
  label, // 위에 경고 관련 (아이디, 비밀번호)
  description, // 입력값 설명
  checkLabel, // 중복 확인 버튼으로 생성할 때 필요
  name, // form data 로 필요함
  children,
  className, // 스타일 추가 할 때 사용
  ...restInputProps
}: InputProps) {
  const {
    userInput,
    handleUserIdChange,
    inputRef,
    handleButtonClick,
    isValidUser,
    labelColor,
    inputColor,
    inputBorderColor,
    descriptionColor,
    descriptionText,
  } = useFunction(description || "");
  const { buttonClass } = useCheckInputEmpty(userInput);

  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
      {label && <label className={`block mb-2 ${labelColor}`}>{label}</label>}
      <div
        className={`${inputBorderColor} self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid `}
      >
        <input
          className={`w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] ${inputColor} text-left flex items-center max-w-[314px] p-0`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={userInput}
          onChange={handleUserIdChange}
          ref={inputRef}
        />

        {checkLabel && (
          <button
            className={`relative text-sm leading-[20px] font-medium font-body-3-m text-center inline-block min-w-[120px] min-h-[36px] rounded-[8px] ${buttonClass}`}
            type="button"
            onClick={handleButtonClick}
          >
            {checkLabel}
          </button>
        )}
      </div>
      {description && (
        <label className={`text-sm ${descriptionColor}`}>
          {descriptionText}
        </label>
      )}
    </div>
  );
}
