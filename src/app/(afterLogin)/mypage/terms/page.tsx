"use client";
import TermsComponents from "./termsComponents";
import SideBar from "../_component/SideBar";

export default function terms() {
  return (
    <div className=" w-[1200px] min-h-[720px] flex flex-grow gap-[27px] mt-[20px] mb-[112px] ">
      {/* 사이드바 */}
      <SideBar menu="terms" />
      {/* 우측 영역 */}
      <div
        className="flex w-[888px] bg-grayscale-0 flex-grow rounded-[16px] min-h-[720px]
        "
      >
        <div className="p-[32px] w-full h-full flex flex-col flex-grow gap-[66px]">
          {/*서비스이용약관 컨테이너*/}
          <TermsComponents option="termsOfService" />
          {/*개인정보처리방침 컨테이너 */}
          <TermsComponents option="privacyPolicy" />
        </div>
      </div>
    </div>
  );
}
