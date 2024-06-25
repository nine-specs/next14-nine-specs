"use client";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  description?: string;
  checkLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Input({
  type = "text", //기본 속성타입
  placeholder, //속성 text
  value,
  label, //위에 경고 관련 (아이디, 비밀번호)
  description, //입력값 설명
  children,
  className, //스타일 추가 할때 사용
}: InputProps) {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
      {label && <label className="block mb-2">{label}</label>}
      <div className="self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
        <input
          className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-400 text-left flex items-center max-w-[314px] p-0"
          type={type}
          placeholder={placeholder}
          value={value}
        />
      </div>
      {description && (
        <label className=" text-sm text-grayscale-700">{description}</label>
      )}
    </div>
  );
}
