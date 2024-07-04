"use client";
import BodyFont from "@/common/BodyFont";
import Input from "@/common/Input";
import TextButton from "@/common/TextButton";
import useFormValidation from "@/hooks/search/useFormValidation";
import { registeredId } from "@/hooks/search/useSearchId";
import { useState } from "react";

type SearchResultState = {
  success: boolean;
  userData: { userId: string; createdAt: string } | null;
};

export default function SearchId() {
  const {
    fields,
    isButtonDisabled,
    handleFieldChange,
    styleStatus,
    descriptionText,
    updateDescriptionText,
    updateStyleStatus,
  } = useFormValidation("");

  const [searchResult, setSearchResult] = useState<SearchResultState>({
    success: true,
    userData: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fields.name || "");
    formData.append("phone", fields.phone || "");

    const result = (await registeredId(formData)) as {
      success: boolean;
      userData?: { userId: string; createdAt: string };
      message?: string;
    };

    if (
      result.userData &&
      typeof result.userData.userId === "string" &&
      typeof result.userData.createdAt === "string"
    ) {
      setSearchResult({
        success: result.success,
        userData: result.userData,
      });

      const { userId, createdAt } = result.userData;
      const url = `/search/name=${userId}created=${createdAt}`;
      window.location.href = url;
    } else {
      setSearchResult({
        success: result.success,
        userData: null,
      });
      updateDescriptionText("등록되지 않은 회원이거나 잘못된 회원정보입니다.");
      updateStyleStatus("warning");
    }
  };

  return (
    <section className="flex flex-row items-center justify-center py-0 px-5 box-border my-[90px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-start m-0 w-[590px] h-[564px] shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0 py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border"
      >
        <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
          <BodyFont level="1" weight="bold" className="text-primary-900">
            아이디 찾기
          </BodyFont>
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            <Input
              placeholder="이름을 입력해주세요"
              label="이름"
              name="name"
              value={fields.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              styleStatus={styleStatus}
            />
            <Input
              placeholder="-를 제외한 전화번호를 입력해주세요"
              label="휴대폰 번호"
              name="phone"
              value={fields.phone || ""}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              styleStatus={styleStatus}
              description={descriptionText}
            />
          </div>
        </div>
        <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
          <TextButton
            type="submit"
            variant="primary"
            disabled={isButtonDisabled}
          >
            아이디 찾기
          </TextButton>
        </div>
      </form>
    </section>
  );
}
