"use client";

import Link from "next/link";

import TextButton from "../TextButton";
import BodyFont from "../BodyFont";

import LOGO_DARK from "../../../public/images/logo/LOGO_Dark.svg";
import LOGO_LIGHT from "../../../public/images/logo/LOGO_Light.svg";

import navList from "./navList";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const handleLogout = async () => {
  await signOut({ callbackUrl: "/" }); // 로그아웃 후 리디렉션할 URL
};

export default function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  // 게스트 랜딩페이지 경로 확인하는 조건문
  const pathname = usePathname();
  const isBeforeLoginMain = pathname === "/";

  const bgStyle = isBeforeLoginMain ? "bg-translate" : "bg-grayscale-0";
  const logoImg = isBeforeLoginMain ? <LOGO_LIGHT /> : <LOGO_DARK />;

  return (
    <header className={`${bgStyle} h-[84px] flex items-center`}>
      <nav className="w-[1200px] mx-auto flex justify-between items-center">
        <div className="flex gap-[20px] items-center">
          <Link href={"/"}>{logoImg}</Link>

          {isLoggedIn && (
            <ul className="flex">
              {navList.map((nav) => (
                <li key={nav.name} className="w-[160px] text-center">
                  <Link href={nav.path}>
                    <BodyFont
                      level="3"
                      weight={pathname === nav.path ? "bold" : "medium"}
                      className="inline-block text-primary-900"
                    >
                      {nav.name}
                    </BodyFont>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isLoggedIn && (
          <div className="w-[102px]">
            <TextButton variant="outline" size="sm" onClick={handleLogout}>
              로그아웃
            </TextButton>
          </div>
        )}
      </nav>
    </header>
  );
}
