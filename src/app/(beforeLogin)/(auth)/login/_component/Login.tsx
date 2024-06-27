// "use client";

import BodyFont from "@/common/BodyFont";
import Image from "next/image";
import Input from "@/common/Input";
import Checkbox from "@/common/Checkbox";
import Link from "next/link";
import TextButton from "@/common/TextButton";

// import { useState } from "react";
import SearchId from "../../../searchId/_component/SearchId";
import SerchPw from "../../../searchPw/_component/SearchPw";
import CheckPwInput from "@/common/CheckPwInput";

const logoImg = [
  { name: "Kakao", src: "/images/logo/kakao.svg" },
  { name: "Naver", src: "/images/logo/Naver.svg" },
  { name: "Google", src: "/images/logo/Google.svg" },
];

export default function LoginComponent() {
  // const [showImage, setShowImage] = useState(true);

  return (
    <>
      <section
        className=" flex flex-row items-center justify-center h-screen py-0 px-5 box-border 
      "
      >
        <form className="flex flex-col items-center justify-start m-0 w-[590px] h-[668px]shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0  py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border ">
          <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
            {/* 타이블 영역 시작  */}
            <BodyFont level="1" weight="bold" className="text-primary-900">
              로그인
            </BodyFont>
            {/* 타이블 영역 끝 */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              {/* 아이디 입력 하는곳 시작 */}
              <Input placeholder="아이디를 입력해주세요" />
              {/* 아이디 입력 하는곳 끝 */}
              {/* 비밀번호 입력 하는곳 시작 */}
              <CheckPwInput
                type="password"
                placeholder="비밀번호를 입력해주세요"
                // showImage={showImage}
              />
              {/* 비밀번호 입력 하는곳 끝 */}
            </div>
          </div>

          {/*자동로그인 아이디 찾기 비밀번호 찾기 시작  */}
          <div className="w-[387.7px] flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
            <div className="flex flex-row items-start justify-start gap-[4px]">
              <Checkbox>
                <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                  <BodyFont level="5" weight="regular">
                    자동 로그인
                  </BodyFont>
                </div>
              </Checkbox>

              {/* <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                <BodyFont level="5" weight="regular">
                  자동 로그인
                </BodyFont>
              </div> */}
            </div>

            <div className="flex flex-row items-start justify-start gap-[8px]">
              <Link href="/searchId">
                <BodyFont level="5" weight="regular">
                  아이디 찾기
                </BodyFont>
              </Link>
              <div className="relative text-sm leading-[20px] font-body-5-r text-grayscale-400 text-left inline-block min-w-[5px]">
                |
              </div>

              <Link href="/searchPw">
                <BodyFont level="5" weight="regular">
                  비밀번호 찾기
                </BodyFont>
              </Link>
            </div>
          </div>
          {/*자동로그인 아이디 찾기 비밀번호 찾기 끝  */}

          {/* 로그인 버튼이랑 회원가입 버튼 시작 */}
          <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
            <TextButton disabled type="submit">
              로그인
            </TextButton>

            <div className="self-stretch flex flex-row items-start justify-between py-4 px-0 gap-[20px] mq450:flex-wrap">
              <BodyFont level="5" weight="regular">
                아직 회원이 아니신가요?
              </BodyFont>
              <Link href="/sign">
                <div className="relative text-sm [text-decoration:underline] leading-[20px] font-medium font-body-5-r text-secondary-600 text-left inline-block min-w-[101px] bg-transparent border-none p-0 cursor-pointer">
                  아잇나우 회원가입
                </div>
              </Link>
            </div>
          </div>
          {/* 로그인 버튼이랑 회원가입 버튼 끝 */}
          <div className="flex justify-center">
            <div className="border-t border-grayscale-400 w-[164px] my-2.5" />
            <BodyFont level="5" weight="regular" className="mx-4">
              또는
            </BodyFont>
            <div className="border-t border-grayscale-400 w-[164px] my-2.5" />
          </div>

          {/* 소셜 로그인 버튼 시작 */}
          <div className="flex flex-row items-start justify-start gap-[16px]">
            {logoImg.map((key, index) => (
              <button key={index}>
                <Image alt={key.name} src={key.src} width={72} height={72} />
              </button>
            ))}
          </div>
          {/* 소셜 로그인 버튼 끝 */}
        </form>
      </section>
    </>
  );
}
