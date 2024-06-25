"use client";
import React from "react";

type ModalProps = {
  /**
  * *참고* 사이즈별 사용되는 페이지 기입

  S1 :   관심주식
  S2 :   로그인 /회원가입
  S3-6 : 설정
  S7-8 : 관심주식 
  
  */
  size: "S1" | "S2" | "S3" | "S4" | "S5" | "S6" | "S7" | "S8";
  children: React.ReactNode;
  onClose?: () => void;
};

/**Size props 필요 */
export const Modal = ({ size, children, onClose }: ModalProps) => {
  const selectedSize: Record<ModalProps["size"], string> = {
    S1: "w-[386px] h-[156px]",
    S2: "w-[386px] h-[212px]",
    S3: "w-[590px] h-[444px]",
    S4: "w-[590px] h-[544px]",
    S5: "w-[590px] h-[688px]",
    S6: "w-[590px] h-[892px]",
    S7: "w-[794px] h-[571px]",
    S8: "w-[794px] h-[735px]",
  };

  return (
    <>
      <div
        className="w-full h-full   fixed left-0 top-0 bg-[#4c4c4c]/[0.53] z-30 flex flex-col flex-grow items-center justify-center "
        onClick={onClose}
      >
        <div
          className={`flex justify-center items-start flex-grow-0 flex-shrink-0 rounded-[32px] bg-white 
          ${selectedSize[size]}
            `}
          onClick={(e) => e.stopPropagation()} // 이벤트버블링 방지
        >
          {children}
        </div>
      </div>
    </>
  );
};
