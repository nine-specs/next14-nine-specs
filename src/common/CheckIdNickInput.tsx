"use client";
import TextButton from "./TextButton";

interface CheckIdNickInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  description?: string;
  checkLabel?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckId?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>; // 중복 확인 버튼 클릭 핸들러
  styleStatus?: "default" | "warning" | "success"; // 스타일 상태
  descriptionText?: string; // 설명 텍스트
}

const labelVariants = {
  default: "text-black",
  warning: "text-warning",
  success: "text-black",
};
const inputVariants = {
  default: "border-grayscale-300 text-black",
  warning: "border-warning text-warning",
  success: "border-grayscale-300",
};
const descriptionVariants = {
  default: "text-grayscale-700",
  warning: "text-warning",
  success: "text-green-500",
};

export default function CheckIdNickInput({
  type = "text",
  placeholder,
  value,
  label,
  description,
  checkLabel,
  name,
  onChange,
  onCheckId,
  styleStatus = "default",
  descriptionText = "",
}: CheckIdNickInputProps) {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-4">
      {label && (
        <label className={`block mb-2 ${labelVariants[styleStatus]}`}>
          {label}
        </label>
      )}
      <div
        className={`self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-3 h-14 gap-4 border ${inputVariants[styleStatus]}`}
      >
        <input
          className="w-full border-none outline-none font-body-5-r text-base bg-transparent h-full leading-6 text-left flex items-center max-w-full p-0"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {checkLabel && (
          <TextButton
            variant={styleStatus}
            onClick={(event) => {
              event.preventDefault();
              if (onCheckId) onCheckId(event);
            }}
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
