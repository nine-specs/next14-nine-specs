import BodyFont from "@/common/BodyFont";
import Link from "next/link";
import React from "react";

const sideBarCSS = "h-[60px] py-[16px] px-[24px]";
const activeMenuCSS = "border-l-8 border-l-primary-900 box-border !pl-[16px]";

type TSidebar = {
  menu: keyof TSideMenuList;
};

interface TSideMenuListMenu {
  selected: boolean;
  menuText: string;
  href: string;
}
interface TSideMenuList {
  profile: TSideMenuListMenu;
  language: TSideMenuListMenu;
  terms: TSideMenuListMenu;
}

export default function SideBar({ menu }: TSidebar) {
  const sideMenuList = {
    profile: {
      selected: false,
      menuText: "개인정보 수정",
      href: "profile",
    },
    language: {
      selected: false,
      menuText: "언어 설정",
      href: "language",
    },
    terms: {
      selected: false,
      menuText: "서비스 이용약관",
      href: "terms",
    },
  };
  // props 전달된 menu만 css 적용.
  sideMenuList[menu].selected = true;

  return (
    <div
      className={`parent w-[285px]  bg-grayscale-0 rounded-[16px]
      min-h-[720px]
`}
    >
      <div className="mt-[24px] flex-col">
        {Object.entries(sideMenuList).map(([key, value]) => (
          <div key={key} className={`${sideBarCSS} ${value.selected ? activeMenuCSS : ""}`}>
            <BodyFont level="2" weight={`${value.selected ? "bold" : "medium"}`} className="text-primary-900">
              <Link href={`/mypage/${value.href}`}>{value.menuText}</Link>
            </BodyFont>
          </div>
        ))}
      </div>
    </div>
  );
}
