import BodyFont from "@/common/BodyFont";
import Link from "next/link";

const sideBarCSS = "h-[60px] py-[16px] px-[24px]";
const activeMenuCSS = "border-l-8 border-l-primary-900 box-border !pl-[16px]";

const sideMenuList = [
  {
    selected: true,
    menuText: "개인정보 수정",
    href: "profile",
  },
  {
    selected: false,
    menuText: "언어 설정",
    href: "language",
  },
  {
    selected: false,
    menuText: "서비스 이용약관",
    href: "terms",
  },
];

export default function ProfilPage() {
  return (
    <div className=" w-[1200px] min-h-[720px] flex gap-[27px] mt-[20px]">
      <div className="w-[285px] h-[720px] bg-grayscale-0 rounded-[16px]">
        <div className="mt-[24px] flex-col">
          {sideMenuList.map((a, i) => (
            <div className={`${sideBarCSS} ${a.selected ? activeMenuCSS : ""}`}>
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
      <div className="w-[888px] h-[720px] bg-grayscale-0 rounded-[16px]"></div>
    </div>
  );
}
