"use client";
// SearchPw 컴포넌트
import BodyFont from "@/common/BodyFont";
import CheckIdEmailInput from "@/common/CheckIdEmailInput";
import Input from "@/common/Input";
import TextButton from "@/common/TextButton";
import useFormValidation from "@/hooks/search/useFormValidation";

export default function SearchPw() {
  const { fields, isButtonDisabled, handleFieldChange } = useFormValidation("");

  return (
    <>
      <section className="flex items-center justify-center py-0 px-5 box-border my-12">
        <form className="flex flex-col items-center justify-center m-0 w-[590px] h-[668px] shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0 py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border">
          <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
            <BodyFont level="1" weight="bold" className="text-primary-900">
              비밀번호 재발급
            </BodyFont>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              <Input
                placeholder="이름을 입력해주세요"
                label="이름"
                name="name"
                value={fields.name || ""}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
              <Input
                placeholder="아이디를 입력해주세요"
                label="아이디"
                name="userId"
                value={fields.userId || ""}
                onChange={(e) => handleFieldChange("userId", e.target.value)}
              />
              <Input
                placeholder="가입 시 입력한 이메일을 입력해주세요"
                label="이메일 주소"
                name="email"
                value={fields.email || ""}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
            </div>
          </div>
          <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
            <TextButton
              type="submit"
              variant="primary"
              disabled={isButtonDisabled}
            >
              임시 비밀번호 발급
            </TextButton>
          </div>
        </form>
      </section>
    </>
  );
}
