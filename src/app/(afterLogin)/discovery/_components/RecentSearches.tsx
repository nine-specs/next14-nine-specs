"use client";
import Time_icon2 from "/public/images/time_icon2.svg";
import Close_icon2 from "/public/images/close_icon2.svg";
import Not_found_icon from "/public/images/Not_found_icon.svg";
import ButtonFont from "@/common/ButtonFont";
import BodyFont from "@/common/BodyFont";
import React, { useEffect, useRef, useState } from "react";
import {
  DeleteAllSearchData,
  DeleteSearchData,
} from "@/hooks/discovery/useDeleteSearchData";

type TrecentData = { keyword: string; date: string }[];

export default function RecentSearches() {
  const [recentKeywordList, setRecentKeywordList] = useState<TrecentData>([]);

  // 로컬스토리지에서 최근 검색어 데이터 가져오기
  useEffect(() => {
    const savedRecentData = localStorage.getItem("recentData");
    if (savedRecentData) {
      setRecentKeywordList(JSON.parse(savedRecentData));
    }
  }, []);

  /** 최근 검색어 삭제버튼 클릭이벤트*/
  const deleteRecentWord = async (keyword: string) => {
    console.log("삭제할 키워드:" + keyword);
    // 로컬스토리지에서 기존 검색어 가져오기
    const savedRecentData = localStorage.getItem("recentData");
    if (savedRecentData) {
      let recentData: TrecentData = JSON.parse(savedRecentData);
      // 데이터에서 키워드 삭제
      recentData = recentData.filter((a) => a.keyword !== keyword);
      // 로컬스토리지에 업데이트된 데이터 저장
      localStorage.setItem("recentData", JSON.stringify(recentData));
      // 스테이트 변경
      setRecentKeywordList(recentData);
    }
  };
  /**최근 검색어 모두삭제 클릭이벤트 */
  const deleteAllRecentWord = async () => {
    localStorage.setItem("recentData", JSON.stringify([]));
    // 스테이트 변경
    setRecentKeywordList([]);
  };

  return (
    <>
      <div className="w-[590px] h-[488px]  flex flex-col ">
        <div className="w-[590px] h-[32px] mb-2 flex justify-between items-center">
          <BodyFont level="1" weight="bold" className="text-primary-900  ">
            최근검색어
          </BodyFont>
          <ButtonFont
            weight="medium"
            className="border-none text-[#575757] underline !text-[14px] !leading-[20px] "
            onClick={deleteAllRecentWord}
          >
            전체삭제
          </ButtonFont>
        </div>
        <div className="w-full h-[448px] rounded-lg bg-grayscale-0 p-6">
          {recentKeywordList.length >= 1 ? (
            <div className="w-full h-full ">
              {recentKeywordList.map((a, i) => {
                return (
                  <div
                    key={i}
                    className=" w-[542px] h-[40px] flex justify-between items-center"
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
                      <div
                        onClick={() => deleteRecentWord(a.keyword)}
                        className="cursor-pointer"
                      >
                        <Close_icon2 />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // 최근 검색어 데이터 없을 경우 표시될 ui
            <div className="w-full h-full flex flex-col items-center justify-center gap-[13px]">
              <Not_found_icon />
              <BodyFont level="1" weight="medium" className="text-primary-900">
                최근 조회한 내역이 없습니다.
              </BodyFont>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
