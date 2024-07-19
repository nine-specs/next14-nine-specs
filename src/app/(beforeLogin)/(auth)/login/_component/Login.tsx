"use client";
import BodyFont from "@/common/BodyFont";
import Image from "next/image";
import Input from "@/common/Input";
import Checkbox from "@/common/Checkbox";
import Link from "next/link";
import TextButton from "@/common/TextButton";
import CheckPwInput from "@/common/CheckPwInput";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const socialProviders = [
    { name: "kakao", imageSrc: "/images/logo/kakao.svg" },
    { name: "naver", imageSrc: "/images/logo/Naver.svg" },
    { name: "google", imageSrc: "/images/logo/Google.svg" },
  ];

  const handleSocialLogin = async (provider: any) => {
    try {
      await signIn(provider, { callbackUrl: "/home" });
      // signIn 함수는 인증이 성공하면 callbackUrl로 이동하므로, 홈 페이지로 리디렉션됨
    } catch (error) {
      console.error("소셜 로그인 에러:", error);
      // 필요에 따라 에러 처리를 추가할 수 있음
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username: userId,
      password: password,
    });

    if (result?.error) {
      // 로그인 실패 처리
      console.error(result.error);
    } else {
      // 로그인 성공 처리
      console.log("로그인 성공:", result);
      router.push("/home");
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center py-0 px-5 box-border my-14">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-start w-[590px] h-[530px] shadow-[0px 0px 10px 5px rgba(203, 203, 203, 0.25)] rounded-tl-[32px] rounded-tr-[32px] bg-grayscale-0 py-20 pr-5 pl-[22px] gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border"
        >
          <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
            <BodyFont level="1" weight="bold" className="text-primary-900">
              로그인
            </BodyFont>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              <Input placeholder="아이디를 입력해주세요" value={userId} onChange={(e) => setUserId(e.target.value)} />
              <CheckPwInput
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-[387.7px] flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
            <div className="flex flex-row items-start justify-start gap-[4px]">
              <Checkbox>
                <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                  <BodyFont level="5" weight="regular">
                    자동 로그인
                  </BodyFont>
                </div>
              </Checkbox>
            </div>
            <div className="flex flex-row items-start justify-start gap-[8px]">
              <Link href="/search/searchId">
                <BodyFont level="5" weight="regular">
                  아이디 찾기
                </BodyFont>
              </Link>
              <div className="relative text-sm leading-[20px] font-body-5-r text-grayscale-400 text-left inline-block min-w-[5px]">
                |
              </div>
              <Link href="/search/searchPw">
                <BodyFont level="5" weight="regular">
                  비밀번호 찾기
                </BodyFont>
              </Link>
            </div>
          </div>
          <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
            <TextButton type="submit">로그인</TextButton>
            <div className="self-stretch flex flex-row items-start justify-between py-4 px-0 gap-[20px] mq450:flex-wrap">
              <BodyFont level="5" weight="regular">
                아직 회원이 아니신가요?
              </BodyFont>
              <Link href="/agree">
                <div className="relative text-sm text-decoration:underline leading-[20px] font-medium font-body-5-r text-secondary-600 text-left inline-block min-w-[101px] bg-transparent border-none p-0 cursor-pointer">
                  아잇나우 회원가입
                </div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="border-t border-grayscale-400 w-[164px] my-2.5" />
            <BodyFont level="5" weight="regular" className="mx-4">
              또는
            </BodyFont>
            <div className="border-t border-grayscale-400 w-[164px] my-2.5" />
          </div>
        </form>
        <div className="flex flex-col items-center justify-start w-[590px] h-[118px] shadow-[0px 0px 10px 5px rgba(203, 203, 203, 0.25)] rounded-bl-[32px] rounded-br-[32px] bg-grayscale-0 ">
          <div className="flex flex-row items-center justify-center gap-[16px]">
            {socialProviders.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleSocialLogin(provider.name)}
                className="social-login-button"
              >
                <Image alt={provider.name} src={provider.imageSrc} width={72} height={72} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
