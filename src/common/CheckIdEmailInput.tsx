"use client";

import { useInputCheck } from "@/hooks/common/useInputCheck";
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

export default function CheckIdEmailInput({
  type = "text",
  placeholder,
  value,
  label,
  description,
  checkLabel,
  name,
  children,
  className,
  ...restInputProps
}: InputProps) {
  const {
    userInput,
    handleChange,
    inputRef,
    handleButtonClick,
    styleStatus,
    descriptionText,
    isButtonDisabled,
  } = useInputCheck(
    description || "",
    name === "email" ? "email" : name === "userId" ? "userId" : "nick",
  );

  console.log(name);
  const getButtonVariant = () => {
    if (!userInput.trim()) return "default"; // 입력 값이 없으면 default
    return styleStatus === "success"
      ? "primary"
      : styleStatus === "warning"
      ? "warning"
      : "primary";
  };
  console.log(descriptionText);

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
          onChange={handleChange}
          ref={inputRef}
          {...restInputProps}
        />

        {checkLabel && (
          <TextButton
            variant={getButtonVariant()}
            onClick={handleButtonClick}
            size="sm"
            disabled={isButtonDisabled}
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
