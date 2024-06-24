import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import { useState } from "react";
import { termsText } from "./termsText";

interface TTermsComponents {
  option: "termsOfService" | "privacyPolicy";
}

export default function TermsComponents({ option }: TTermsComponents) {
  const [isOpened, setIsOpened] = useState(false);
  const handleToggle = () => {
    setIsOpened(!isOpened);
  };
  return (
    <>
      <div
        className={` w-[822px]  flex-grow
              ${isOpened ? "h-auto" : "h-[294px]"}
          `}
      >
        <div className="w-[822px] h-[28px] mb-[16px] flex justify-between items-center">
          <BodyFont level="2" weight="bold" className="text-primary-900">
            {option == "termsOfService"
              ? "서비스 이용약관"
              : "개인정보 처리방침"}
          </BodyFont>
          <ButtonFont
            weight="medium"
            className="text-secondary-600 "
            onClick={handleToggle}
          >
            펼쳐서 보기
          </ButtonFont>
        </div>
        <div
          className={`w-[822px]  border border-primary-100 rounded-2xl p-6 ${
            isOpened ? "h-auto" : "h-[250px]"
          }`}
        >
          <div
            className={`w-full h-full ${
              isOpened ? "h-auto" : "overflow-hidden"
            }`}
          >
            <pre className="whitespace-pre-wrap">{termsText[option]}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
