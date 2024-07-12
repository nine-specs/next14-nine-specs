"use client";
import { useCallback, useEffect, useRef } from "react";
import Search_icon from "/public/images/Search_icon.svg";
import { useSearchAction } from "@/hooks/discovery/useSearchAction";
import { getStockList } from "@/hooks/profile/useStocksHandler";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /**검색항목을 최근검색어로 로컬스토리지에 저장 */
  const saveRecentSearch = (keyword: string) => {
    //현재날짜 구하기
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const today = `${month}.${day}`;
    const newRecentData = { keyword: keyword, date: today };
    let recentData: { keyword: string; date: string }[] = [];
    // 기존에 저장된 최근검색어 가져오기
    const savedRecentData = localStorage.getItem("recentData");
    if (savedRecentData) {
      // 저장된게 있다면 파싱
      recentData = JSON.parse(savedRecentData);
      //10개 이상이라면 마지막 요소를 제거하기
      if (recentData.length > 9) {
        recentData.pop();
      }
      // 배열 앞쪽에 새 최근검색어 추가
      recentData.unshift(newRecentData);
    } else {
      // 저장된게 없다면 새 최근검색어만 추가
      recentData = [newRecentData];
    }
    localStorage.setItem("recentData", JSON.stringify(recentData));
  };

  // 검색 아이콘 클릭시 post요청
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("검색버튼 클릭");
    e.stopPropagation();
    if (inputRef.current) {
      //검색 버튼 클릭 시 검색form onSubmit 실행
      if (formRef.current) {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      }
    }
  };

  // submit 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit 작동");
    e.preventDefault();

    const keyword = e.currentTarget.keyword.value;
    // 입력된 값이 있어야 최근검색어로 저장함.
    if (keyword) {
      const stockList = await getStockList(); // 주식종목리스트 가져오기
      let flag = false;
      // 주식종목 리스트 중 키워드에 일치하는 종목명과 종목코드가 있다면 flag를 true변경.
      stockList.map((item, index) => {
        if (item.stockName == keyword || item.stockCode == keyword) {
          flag = true;
        }
        console.log(item.stockName + flag);
      });
      console.log("flag의 상태:" + flag);
      //주식종목에 해당되면 최근검색어 저장, 검색 액션 실행
      if (flag) {
        // 최근검색어 저장
        saveRecentSearch(keyword);
        const formData = new FormData();
        formData.append("keyword", keyword);
        useSearchAction(formData);
      } else {
        alert("주식종목 검색만 가능합니다.");
      }
    }
  };

  return (
    <>
      <div className="rounded-lg bg-grayscale-0 flex flex-row items-center box- py-4 pl-11 h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* 검색창 */}
          <div
            className="absolute top-4 left-4 cursor-pointer"
            onClick={onClick}
          >
            <Search_icon />
          </div>
          <input
            ref={inputRef}
            className="w-[590px] h-[56px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] leading-[24px] text-primary-900 text-left flex items-center max-w-[314px] p-0"
            name="keyword"
            placeholder="종목을 검색해주세요"
          />
        </form>
      </div>
    </>
  );
}
