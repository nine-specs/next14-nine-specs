import Input from "@/common/Input";
import React from "react";
import Search_icon from "/public/images/Search_icon.svg";
import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import Time_icon2 from "/public/images/time_icon2.svg";
import Close_icon2 from "/public/images/close_icon2.svg";

export default function serchPage() {
  const recentKeywordList = [
    { keyword: "테슬라", date: "06.14" },
    { keyword: "애플", date: "06.14" },
    { keyword: "구글", date: "06.14" },
    { keyword: "네이버", date: "06.14" },
    { keyword: "AMD", date: "06.14" },
    { keyword: "코카콜라", date: "06.13" },
    { keyword: "엔비디아", date: "06.13" },
    { keyword: "나이키", date: "06.12" },
    { keyword: "쿠팡", date: "06.12" },
    { keyword: "삼성", date: "06.11" },
  ];

  return (
    <div className=" w-[590px] h-[896px] flex flex-col relative gap-8  mx-auto mt-[56px]">
      <div className=" rounded-lg bg-grayscale-0 flex flex-row items-center  py-0 pl-11 h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
        {/* 검색창 */}
        <div className="absolute left-4">
          <Search_icon />
        </div>
        <input
          className="w-[590px] h-[56px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] leading-[24px] text-primary-900 text-left flex items-center max-w-[314px] p-0  "
          name="keyword"
          placeholder="종목을 검색해주세요"
        />
      </div>
      {/* 검색창 끝*/}
      {/* 최근검색어 */}
      <div className="w-[590px] h-[488px]  flex flex-col ">
        <div className="w-[590px] h-[32px] mb-2 flex justify-between items-center">
          <BodyFont level="1" weight="bold" className="text-primary-900  ">
            최근검색어
          </BodyFont>
          <ButtonFont
            weight="medium"
            className="border-none text-[#575757] underline !text-[14px] !leading-[20px] "
          >
            전체삭제
          </ButtonFont>
        </div>
        <div className="w-full h-[448px] rounded-lg bg-grayscale-0 p-6">
          <div className="w-full h-full border">
            {recentKeywordList.map((a, i) => {
              return (
                <div
                  key={i}
                  className="border border-green-600 w-[542px] h-[40px] flex justify-between items-center"
                >
                  <div className="w- flex items-center gap-[10px]">
                    <Time_icon2 />
                    <BodyFont
                      level="4"
                      weight="medium"
                      className="text-grayscale-600"
                    >
                      {a.keyword}
                    </BodyFont>
                  </div>
                  <div className="w-[66px] flex items-center gap-[8px]">
                    <BodyFont
                      level="5"
                      weight="regular"
                      className="text-grayscale-400"
                    >
                      {a.date}
                    </BodyFont>
                    <Close_icon2 />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 최근검색어 끝*/}
      {/* 인기검색어 */}
      <div className="w-[590px] h-[288px]   flex flex-col ">
        <div className="w-[590px] h-[32px] mb-2 flex gap-4">
          <BodyFont level="1" weight="bold" className="text-primary-900">
            인기검색어
          </BodyFont>
          <ButtonFont
            weight="medium"
            className="border-none text-[#575757] underline !text-[14px] !leading-[20px] "
          >
            00:00 기준
          </ButtonFont>
        </div>
        <div className="w-full h-[248px] rounded-lg bg-grayscale-0 p-6">
          <div className="w-full h-full border"></div>
        </div>
      </div>
    </div>
  );
}
