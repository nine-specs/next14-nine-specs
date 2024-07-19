import BodyFont from "@/common/BodyFont";
import React from "react";

type tAccountInfoBox = {
  title: string;
  info?: string;
};

export default function AccountInfoBox({ title, info }: tAccountInfoBox) {
  return (
    <>
      <div className="flex items-center mb-6">
        <BodyFont level="3" weight="medium" className="w-24 text-grayscale-900">
          {title}
        </BodyFont>
        <BodyFont
          level="4"
          weight="medium"
          className="flex-grow text-grayscale-600"
        >
          {info}
        </BodyFont>
      </div>
    </>
  );
}
