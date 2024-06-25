"use client";
import BodyFont from "@/common/BodyFont";
import Link from "next/link";
import TermsComponents from "./termsComponents";

const sideBarCSS = "h-[60px] py-[16px] px-[24px]";
const activeMenuCSS = "border-l-8 border-l-primary-900 box-border !pl-[16px]";
const sideMenuList = [
  {
    selected: false,
    menuText: "개인정보 수정",
    href: "profile",
  },
  {
    selected: false,
    menuText: "언어 설정",
    href: "language",
  },
  {
    selected: true,
    menuText: "서비스 이용약관",
    href: "terms",
  },
];

export default function terms() {
  return (
    <div className=" w-[1200px] min-h-[720px] flex flex-grow gap-[27px] mt-[20px] mb-[112px] ">
      {/* 사이드바 */}
      <div
        className={`parent w-[285px]  bg-grayscale-0 rounded-[16px]
            min-h-[720px]
      `}
      >
        <div className="mt-[24px] flex-col">
          {sideMenuList.map((a, i) => (
            <div
              key={i}
              className={`${sideBarCSS} ${a.selected ? activeMenuCSS : ""}`}
            >
              <BodyFont
                level="2"
                weight={`${a.selected ? "bold" : "medium"}`}
                className="text-primary-900"
              >
                <Link href={`/mypage/${a.href}`}>{a.menuText}</Link>
              </BodyFont>
            </div>
          ))}
        </div>
      </div>
      {/* 우측 영역 */}
      <div
        className={`flex w-[888px]  bg-grayscale-0 flex-grow rounded-[16px]
            min-h-[720px]
        `}
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
