"use client";
import Time_icon2 from "/public/images/time_icon2.svg";
import Close_icon2 from "/public/images/close_icon2.svg";
import Not_found_icon from "/public/images/Not_found_icon.svg";
import ButtonFont from "@/common/ButtonFont";
import BodyFont from "@/common/BodyFont";
import React, { useRef, useState } from "react";
import {
  DeleteAllSearchData,
  DeleteSearchData,
} from "@/hooks/search/useDeleteSearchData";
type TSearchData = {
  recentSearchData: {
    keyword: string;
    date: string;
  }[];
};

export default function RecentSearches({ recentSearchData }: TSearchData) {
  const [recentKeywordList, setRecentKeywordList] = useState(recentSearchData);

  /** 최근 검색어 삭제버튼 클릭이벤트*/
  const deleteRecentWord = async (keyword: string) => {
    try {
      console.log("클릭된 키워드:", keyword);
      // 클릭된 키워드를 삭제하는 서버액션
      const response = await DeleteSearchData(keyword);
      const result = response.success;
      console.log("결과:" + result);
      if (result) {
        //키워드 제외한 keywordList를 새로 설정해 재랜더링
        setRecentKeywordList(
          recentKeywordList.filter((a) => a.keyword !== keyword),
        );
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  /**최근 검색어 모두삭제 클릭이벤트 */
  const deleteAllRecentWord = async () => {
    try {
      const result = await DeleteAllSearchData();
      if (result.success) {
        //모두삭제 성공시 빈배열로 재렌더링
        setRecentKeywordList([]);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  // recentSearchData = []; //빈 데이터일때
  // let recentKeywordList = recentSearchData
  //   ? recentSearchData
  //   : [
  //       // 더미데이터
  //       { keyword: "테슬라", date: "06.14" },
  //       { keyword: "애플", date: "06.14" },
  //       { keyword: "구글", date: "06.14" },
  //       { keyword: "네이버", date: "06.14" },
  //       { keyword: "AMD", date: "06.14" },
  //       { keyword: "코카콜라", date: "06.13" },
  //       { keyword: "엔비디아", date: "06.13" },
  //       { keyword: "나이키", date: "06.12" },
  //       { keyword: "쿠팡", date: "06.12" },
  //       { keyword: "삼성", date: "06.11" },
  //     ];

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