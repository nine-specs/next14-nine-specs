import Link from "next/link";

import TextButton from "../TextButton";
import BodyFont from "../BodyFont";

import LogoDark from "../../../public/images/logo/LOGO_Dark.svg";
import LogoLight from "../../../public/images/logo/LOGO_Light.svg";

import navList from "./navList";

export default function Header({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  const bgStyle = isLoggedIn ? "bg-grayscale-0" : "bg-translate";
  const logoImg = isLoggedIn ? <LogoDark /> : <LogoLight />;

  return (
    <header className={`${bgStyle} h-[84px] flex items-center`}>
      <nav className="w-full mx-[120px] flex justify-between items-center">
        <div className="flex gap-[20px] items-center">
          <Link href={"/"}>{logoImg}</Link>
          {isLoggedIn && (
            <ul className="flex">
              {navList.map((nav) => (
                <li key={nav.name} className="w-[160px] text-center">
                  <Link href={nav.path}>
                    <BodyFont
                      level="3"
                      weight="medium"
                      className="inline-block"
                    >
                      {nav.name}
                    </BodyFont>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <TextButton variant="outline" size="sm" className="w-[102px]">
          {isLoggedIn ? "로그아웃" : "로그인"}
        </TextButton>
      </nav>
    </header>
  );
}
