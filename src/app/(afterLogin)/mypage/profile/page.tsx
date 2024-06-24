import BodyFont from "@/common/BodyFont";
import TextButton from "@/common/TextButton";
import Link from "next/link";
import ProfileSVG from "/public/images/profile_sm.svg";

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

const accountInfo = {
  아이디: "sfacspaceid",
  이름: "김스팩",
  생년월일: "991231",
};

export default function ProfilPage() {
  return (
    <div className=" w-[1200px] min-h-[720px] flex gap-[27px] mt-[20px] mb-[112px]">
      {/* 사이드바 */}
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
      {/* 우측 영역 */}
      <div className="w-[888px] h-[720px] bg-grayscale-0 rounded-[16px] p-[32px]">
        <div className="w-full h-[388px] ">
          <div className="w-full h-[140px]  ">
            <div className="w-full h-[60px]  flex justify-between items-center">
              <div className="h-full w-[483px] ">
                <BodyFont level="2" weight="bold" className="text-primary-900">
                  프로필 설정
                </BodyFont>
                <BodyFont
                  level="4"
                  weight="regular"
                  className="text-grayscale-900 mt-2"
                >
                  서비스 사용시 보여지는 프로필을 생성 및 변경합니다. 프로필을
                  설정해보세요.
                </BodyFont>
              </div>
              <TextButton variant="primary" size="sm" className="!w-[160px] ">
                프로필 수정
              </TextButton>
            </div>
            <div className=" w-[754px] h-[56px]  mt-6 flex justify-between gap-[122px]">
              <p className="text-base">프로필</p>
              <div className="w-[590px] h-[56px] flex justify-between gap-4 items-center">
                <ProfileSVG width="56px" height="56px" />
                <div className="w-[518px]">
                  <BodyFont level="4" weight="medium">
                    김스펙
                  </BodyFont>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[140px]   mt-8">
            <div className="w-full h-[60px]  flex justify-between items-center">
              <div className="h-full w-auto ">
                <BodyFont level="2" weight="bold" className="text-primary-900">
                  계정 설정
                </BodyFont>
                <BodyFont
                  level="4"
                  weight="regular"
                  className="text-grayscale-900 mt-2"
                >
                  서비스 이용시 사용되는 계정을 생성 및 변경합니다. 계정을
                  연동하여 다양한 서비스를 이용해보세요.
                </BodyFont>
              </div>
              <TextButton variant="primary" size="sm" className="!w-[160px]">
                계정정보 수정
              </TextButton>
            </div>
            <div className="pt-6">
              {Object.entries(accountInfo).map(([key, value]) => (
                <div className="flex items-center mb-6">
                  <BodyFont
                    level="3"
                    weight="medium"
                    className="w-24 text-grayscale-900"
                  >
                    {key}
                  </BodyFont>
                  <BodyFont
                    level="4"
                    weight="medium"
                    className="flex-grow text-grayscale-600"
                  >
                    {value}
                  </BodyFont>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
