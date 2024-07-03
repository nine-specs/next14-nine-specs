import React from "react";
import Search_icon from "/public/images/Search_icon.svg";
import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import NotFoundIcon from "/public/images/Not_found_icon.svg";

export default function Page() {
  type TsearchStockList =
    | {
        word: string;
      }[]
    | null;
  // 데이터 초기값 설정
  let data: TsearchStockList = [
    { word: "검색결과1" },
    { word: "검색결과2" },
    { word: "검색결과3" },
  ];
  let searchStockList = data;

  // 데이터 초기값 설정

  return (
    <>
      <div className="w-[590px] h-[896px] flex flex-col relative gap-8 mx-auto mt-[56px]">
        <div className="rounded-lg bg-grayscale-0 flex flex-row items-center py-0 pl-11 h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
          {/* 검색창 */}
          <div className="absolute left-4">
            <Search_icon />
          </div>
          <input
            className="w-[590px] h-[56px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] leading-[24px] text-primary-900 text-left flex items-center max-w-[314px] p-0"
            name="keyword"
            placeholder="종목을 검색해주세요"
          />
        </div>
        {/* 주식탭 */}
        <div className="w-[590px] h-auto flex flex-col">
          <div className="w-[590px] h-[32px] mb-2 flex gap-4">
            <BodyFont level="1" weight="bold" className="text-primary-900">
              주식
            </BodyFont>
            <ButtonFont
              weight="medium"
              className="border-none text-[#575757] underline !text-[14px] !leading-[20px]"
            >
              (12)
            </ButtonFont>
          </div>
          <div className="w-full h-auto rounded-lg bg-grayscale-0 p-6 flex flex-col gap-[10px]">
            {searchStockList ? (
              <div>
                <div className="w-[542px] h-[208px]">
                  {/* 여기 데이터 */}
                  {searchStockList.map((a, index) => (
                    <div key={index}>{a.word}</div>
                  ))}
                </div>
                <div className="mt-2 w-[542px] h-[40px] border-t border-gray-300 pt-4 px-[10px] text-center">
                  더보기
                </div>
              </div>
            ) : (
              <div className="w-[542px] h-[208px] border flex flex-col items-center justify-center gap-[13px]">
                <NotFoundIcon />
                <BodyFont
                  level="2"
                  weight="regular"
                  className="text-primary-900"
                >
                  조회된 검색결과가 없습니다.
                </BodyFont>
              </div>
            )}
          </div>
        </div>
        <div>
          {/* 뉴스탭 */}
          <div className="w-[590px] h-[288px] flex flex-col">
            <div className="w-[590px] h-[32px] mb-2 flex gap-4">
              <BodyFont level="1" weight="bold" className="text-primary-900">
                뉴스
              </BodyFont>
              <ButtonFont
                weight="medium"
                className="border-none text-[#575757] underline !text-[14px] !leading-[20px]"
              >
                (12)
              </ButtonFont>
            </div>
            <div className="w-full h-auto rounded-lg bg-grayscale-0 p-6 flex flex-col gap-[10px]">
              <div className="w-full h-auto border">
                {/* 여기안에 데이터 */}
                {/* 더미데이터 */}
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4">
                  <img
                    src="rectangle-511385.jpeg"
                    className="flex-grow-0 flex-shrink-0 w-[120px] h-16 rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3.5">
                    <p className="flex-grow-0 flex-shrink-0 w-[406px] text-base font-medium text-left text-[#121212]">
                      일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"
                    </p>
                    <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-2">
                      <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#575757]">
                        n시간전
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#575757]">
                        ∙
                      </p>
                      <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#575757]">
                        문화일보
                      </p>
                    </div>
                  </div>
                </div>
                {/* 데이터 끝 */}
              </div>
              <div className="mt-2 w-[542px] h-[40px] border-t border-gray-300 pt-4 px-[10px] text-center">
                더보기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
