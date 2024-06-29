"use client";
import BodyFont from "@/common/BodyFont";
import Input from "@/common/Input";
import TextButton from "@/common/TextButton";
import { registeredId } from "@/hooks/search/useSearchId";
import { useState } from "react";

type SearchResultState = {
  success: boolean;
  userData: { userId: string; createdAt: string } | null;
};

export default function SearchId() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResultState>({
    success: true,
    userData: null,
  });

  const activate = name && phone;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);

    // 타입 단언을 사용하여 result 객체의 타입을 명시적으로 지정
    const result = (await registeredId(formData)) as {
      success: boolean;
      userData?: { userId: string; createdAt: string };
      message?: string;
    };
    console.log("123", result);

    if (
      result.userData &&
      typeof result.userData.userId === "string" &&
      typeof result.userData.createdAt === "string"
    ) {
      setSearchResult({
        success: result.success,
        userData: result.userData,
      });

      // Navigate programmatically
      const { userId, createdAt } = result.userData;
      const url = `/search/name=${userId}created=${createdAt}`;
      window.location.href = url;
    } else {
      setSearchResult({
        success: result.success,
        userData: null,
      });
      const urls = `/search/searchedId`; //일단 이동은 시켜야되니까 이쪽으로 보내줌
      window.location.href = urls;
    }
  };

  return (
    <section className="flex flex-row items-center justify-center py-0 px-5 box-border my-[90px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-start m-0 w-[590px] h-[564px] shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0 py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border"
      >
        <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
          {/* 타이틀 영역 시작 */}
          <BodyFont level="1" weight="bold" className="text-primary-900">
            아이디 찾기
          </BodyFont>
          {/* 타이틀 영역 끝 */}
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
            {/* 이름 입력란 시작 */}
            <Input
              placeholder="이름을 입력해주세요"
              label="이름"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* 이름 입력란 끝 */}

            {/* 전화번호 입력란 시작 */}
            <Input
              placeholder="전화번호를 입력해주세요"
              label="휴대폰 번호"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* 전화번호 입력란 끝 */}
          </div>
        </div>
        <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
          <TextButton type="submit" variant="primary" disabled={!activate}>
            아이디 찾기
          </TextButton>
        </div>
      </form>
    </section>
  );
}
