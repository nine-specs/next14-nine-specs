import BodyFont from "@/common/BodyFont";
import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import Link from "next/link";
import React from "react";

export default function accountDeletionPage() {
  return (
    <div>
      <div className="flex flex-col gap-2.5  mt-[120px] m-auto w-[598px] h-[400px] px-[102px] py-20 rounded-[32px] bg-white">
        <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 gap-14">
          <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-6">
            <HeadingFont level="3" weight="bold" className="text-primary-900">
              회원탈퇴가 완료되었습니다.
            </HeadingFont>
            <BodyFont
              level="2"
              weight="regular"
              className="text-grayscale-900 text-center"
            >
              아잇나우를 이용해주셔서 감사합니다.
              <br />
              더욱 더 노력하고 발전하는 아잇나우가 되겠습니다.
            </BodyFont>
          </div>
          <Link href="/" className="w-full h-full">
            <TextButton variant="primary" size="lg">
              확인
            </TextButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
