import React from "react";
import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
export default function PopularSearches() {
  const popularSearchList = [
    { rank: 1, keyword: "테슬라" },
    { rank: 2, keyword: "애플" },
    { rank: 3, keyword: "테슬라" },
    { rank: 4, keyword: "테슬라" },
    { rank: 5, keyword: "테슬라" },
    { rank: 6, keyword: "테슬라" },
    { rank: 7, keyword: "코카콜라" },
    { rank: 8, keyword: "테슬라" },
    { rank: 9, keyword: "테슬라" },
    { rank: 10, keyword: "테슬라" },
  ];
  return (
    <>
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
          <div className="w-full h-full  flex justify-between gap-4">
            <div className="w-[263px] h-full">
              {popularSearchList.map((a, i) => {
                if (i < 5) {
                  return (
                    <div
                      key={i}
                      className="w-[263px] h-[40px] py-2 flex justify-start gap-4"
                    >
                      <div className="w-[18px]">
                        <BodyFont
                          level="4"
                          weight="regular"
                          className="text-primary-900"
                        >
                          {a.rank}
                        </BodyFont>
                      </div>
                      <BodyFont
                        level="4"
                        weight="regular"
                        className="text-grayscale-600"
                      >
                        {a.keyword}
                      </BodyFont>
                    </div>
                  );
                }
              })}
            </div>
            <div className="w-[263px] h-full ">
              {popularSearchList.map((a, i) => {
                if (i >= 5) {
                  return (
                    <div
                      key={i}
                      className="w-[263px] h-[40px] py-2 flex justify-start gap-4"
                    >
                      <div className="w-[18px]">
                        <BodyFont
                          level="4"
                          weight="regular"
                          className="text-primary-900"
                        >
                          {a.rank}
                        </BodyFont>{" "}
                      </div>
                      <BodyFont
                        level="4"
                        weight="regular"
                        className="text-grayscale-600"
                      >
                        {a.keyword}
                      </BodyFont>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
