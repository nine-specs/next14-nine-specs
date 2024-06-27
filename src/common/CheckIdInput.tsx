"use client";

import { useIdCheck } from "@/hooks/common/useIdCheck";
import TextButton from "./TextButton";

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

const labelVariants = {
  default: "text-black",
  warning: "text-warning",
  success: "text-black",
};
const inputVariants = {
  default: "border-grayscale-300 [&>input]:text-black",
  warning: "border-warning [&>input]:text-warning",
  success: "border-grayscale-300",
};
const descriptionVariants = {
  default: "text-grayscale-700",
  warning: "text-warning",
  success: "text-green-500",
};

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
    styleStatus,
    descriptionText,
  } = useIdCheck(description || "");

  const getButtonVariant = () => {
    if (!userInput) return "default";
    return styleStatus === "success" ? "primary" : styleStatus;
  };

  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
      {label && (
        <label className={`block mb-2 ${labelVariants[styleStatus]}`}>
          {label}
        </label>
      )}
      <div
        className={`self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border ${inputVariants[styleStatus]}`}
      >
        <input
          className={`w-[314px] border-none outline-none font-body-5-r text-base bg-transparent h-full leading-[24px] text-left flex items-center max-w-[314px] p-0`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={userInput}
          onChange={handleUserIdChange}
          ref={inputRef}
          {...restInputProps}
        />

        {checkLabel && (
          <TextButton
            variant={getButtonVariant()}
            onClick={handleButtonClick}
            size="sm"
          >
            {checkLabel}
          </TextButton>
        )}
      </div>
      {description && (
        <label className={`text-sm ${descriptionVariants[styleStatus]}`}>
          {descriptionText}
        </label>
      )}
    </div>
  );
}
