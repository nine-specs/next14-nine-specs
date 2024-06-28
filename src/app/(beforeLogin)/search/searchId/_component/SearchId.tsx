"use client";
import BodyFont from "@/common/BodyFont";
import Input from "@/common/Input";
import TextButton from "@/common/TextButton";
import SearchedId from "../../searchedId/_component/SearchedId";
import useSearchHandle from "@/hooks/search/useSearchHandle";

export default function SearchId() {
  const {
    searchResult,
    showSearchedId,
    name,
    setName,
    phone,
    setPhone,
    handleSubmit,
  } = useSearchHandle();

  return (
    <section
      className={`flex flex-row items-center justify-center py-0 px-5 box-border  my-[90px]`}
    >
      {!showSearchedId ? (
        <form
          className="flex flex-col items-center justify-start m-0 w-[590px] h-[564px] shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0 py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border"
          onSubmit={handleSubmit}
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
            {name && phone ? (
              <TextButton type="submit" variant="primary">아이디 찾기</TextButton>
            ) : (
              <TextButton type="submit" disabled>
                아이디 찾기
              </TextButton>
            )}
          </div>
        </form>
      ) : (
        <SearchedId searchResult={searchResult} />
      )}
    </section>
  );
}
