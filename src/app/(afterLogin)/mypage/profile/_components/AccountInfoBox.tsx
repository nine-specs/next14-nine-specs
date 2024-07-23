import BodyFont from "@/common/BodyFont";
import React from "react";
import Kakao from "/public/images/logo/KaKao.svg";
type tAccountInfoBox = {
  title: string;
  info?: string;
  img?: string;
};

export default function AccountInfoBox({ title, info, img }: tAccountInfoBox) {
  return (
    <>
      <div className="flex items-center mb-6">
        <BodyFont level="3" weight="medium" className="w-24 text-grayscale-900">
          {title}
        </BodyFont>
        {img && <Kakao height={45} width={45} />}
        <BodyFont level="4" weight="medium" className="flex-grow text-grayscale-600">
          {info}
        </BodyFont>
      </div>
    </>
  );
}
