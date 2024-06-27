"use client";
import BodyFont from "@/common/BodyFont";
import TextButton from "@/common/TextButton";
import Link from "next/link";

interface SearchResult {
  userId: string;
  createdAt: string;
}

interface Props {
  searchResult: SearchResult;
}

export default function SearchedId({ searchResult }: Props) {
  const formattedDate = searchResult.createdAt.split("T")[0];

  return (
    <div className="flex flex-row items-center justify-center py-0 px-5 box-border  ">
      <div className="flex flex-col items-center justify-start m-0 w-[590px] h-[564px] shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0 py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border ">
        <div className="w-[386px] h-[120px] flex flex-col items-center justify-start  max-w-full mq450:gap-[20px]">
          {/* 타이틀 영역 시작 */}
          <BodyFont level="1" weight="bold" className="text-primary-900">
            아이디 찾기
          </BodyFont>
          {/* 타이틀 영역 끝 */}
          <span className="text-center mb-[32px] mt-4">
            입력한 정보로 조회된 아이디입니다.
          </span>
          <div className="self-stretch grid grid-cols-1 gap-[14px] border border-grayscale-300 rounded-[8px] p-4">
            <div className="flex justify-center items-center">
              <span>아이디 :</span>
              <span className="ml-2">{searchResult.userId}</span>
            </div>
            <div className="flex justify-center items-center">
              <span>가입일 :</span>
              <span className="ml-2">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* 로그인 버튼이랑 회원가입 버튼 시작 */}

        <div className=" flex flex-col items-start justify-start  mt-28">
          <Link href="/login">
            <div className="w-[386px]">
              <TextButton type="submit" variant="primary">
                로그인
              </TextButton>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
