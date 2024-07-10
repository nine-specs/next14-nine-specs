"use client";

import React from "react";

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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styleStatus?: "default" | "warning"; // styleStatus 속성 추가
  maxLength?: number;
  disabled?: boolean;
}

const labelVariants = {
  default: "text-black",
  warning: "text-warning",
};
const inputVariants = {
  default: "border-grayscale-300 [&>input]:text-black",
  warning: "border-warning [&>input]:text-warning",
};
const descriptionVariants = {
  default: "text-grayscale-700",
  warning: "text-warning",
};

export default function Input({
  type = "text",
  placeholder,
  value,
  label,
  description,
  name,
  onChange,
  children,
  className,
  styleStatus = "default", // 기본값을 "default"로 설정
  maxLength,
  disabled = false, // disabled의 기본값을 false로 설정
}: InputProps) {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
      {label && (
        <label className={`block mb-2 ${labelVariants[styleStatus]}`}>
          {label}
        </label>
      )}
      <div
        className={`self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid ${inputVariants[styleStatus]}`}
      >
        <input
          className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-400 text-left flex items-center max-w-[314px] p-0"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
        />
      </div>
      {description && (
        <label className={`text-sm ${descriptionVariants[styleStatus]}`}>
          {description}
        </label>
      )}
    </div>
  );
}
