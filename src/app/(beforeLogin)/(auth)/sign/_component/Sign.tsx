"use client";
import CheckIdInput from "@/common/CheckIdInput";
import CheckPwInput from "@/common/CheckPwInput";
import Input from "@/common/Input";
import TextButton from "@/common/TextButton";
import { register } from "../../../../../hooks/sign/useSign";
import HeadingFont from "@/common/HeadingFont";
import { useFormCheck } from "@/hooks/common/useFormCheck";
import { useEffect, useState } from "react";

export default function Sign() {
  const {
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMatch,
    phone,
    setPhone,
    birthdate,
    setBirthdate,
    isFormValid,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = useFormCheck();

  useEffect(() => {
    // useFormCheck 훅에서 반환한 객체가 변경될 때마다 호출되는 부분입니다.
    // 이 예제에서는 마운트 후 처음에 한 번만 실행됩니다.
    console.log("isFormValid:", isFormValid());
  }, [name, password, confirmPassword, phone, birthdate]);

  return (
    <>
      <section
        className=" flex flex-row items-center justify-center py-0 px-5 box-border  my-12
          "
      >
        <form
          className="flex flex-col items-center justify-start m-0 w-[590px] h-[668px]shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0  py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border border "
          action={register}
        >
          <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
            {/* 타이블 영역 시작  */}
            <HeadingFont level="3" weight="bold" className="text-primary-900">
              회원가입
            </HeadingFont>
            {/* 타이블 영역 끝 */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              <Input
                placeholder="이름을 입력해주세요"
                label="이름"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* 아이디 입력 하는곳 시작 */}
              <CheckIdInput
                label="아이디"
                name="userId"
                description="* 6~12자의 영문,숫자,_를 이용한 조합"
                checkLabel="중복 확인"
                placeholder="아이디를 입력해주세요"
              />
              {/* 아이디 입력 하는곳 끝 */}

              {/* 비밀번호 입력 하는곳 시작 */}
              <CheckPwInput
                placeholder="비밀번호를 입력해주세요"
                label="비밀번호 입력"
                name="password"
                type="password"
                description="* 8~20자 이내 숫자,특수문자,영문자로 조합해주세요"
                value={password}
                //onChange={(e) => setPassword(e.target.value)}
                onChange={handlePasswordChange}
                passwordMatch={passwordMatch}
              />
              {/* 비밀번호 입력 하는곳 끝 */}

              {/* 비밀번호 확인 입력 하는곳 시작 */}
              <CheckPwInput
                placeholder="비밀번호를 다시 입력해주세요"
                label="비밀번호 확인"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                onChange={handleConfirmPasswordChange}
                passwordMatch={passwordMatch}
                description={
                  passwordMatch
                    ? "비밀번호가 일치합니다."
                    : "비밀번호가 일치하지 않습니다."
                }
              />
              {/* 비밀번호 확인 입력 하는곳 끝 */}

              {/* 휴대폰번호 확인 입력 하는곳 시작 */}
              <Input
                placeholder="-를 제외한 휴대폰번호를 입력해주세요"
                label="휴대폰번호"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* 휴대폰번호 입력 하는곳 끝 */}

              {/* 생년월일 입력 하는곳 시작 */}
              <Input
                placeholder="생년월일 6자를 입력해주세요(예시:990101)"
                label="생년월일"
                name="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
              {/* 생년월일 입력 하는곳 끝 */}
            </div>
          </div>

          {/* 로그인 버튼이랑 회원가입 버튼 시작 */}
          <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
            <TextButton
              variant={isFormValid() ? "primary" : "default"}
              disabled={!isFormValid()}
            >
              가입
            </TextButton>
          </div>
        </form>
      </section>
    </>
  );
}
