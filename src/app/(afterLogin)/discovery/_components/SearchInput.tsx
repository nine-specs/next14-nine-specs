"use client";
import { useEffect, useRef } from "react";
import Search_icon from "/public/images/Search_icon.svg";
import { useSearchAction } from "@/hooks/discovery/useSearchAction";

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
      // 배열 앞쪽에 새 최근검색어 추가
      if (recentData.length > 9) {
        recentData.pop();
      }
      recentData.unshift(newRecentData);
    } else {
      // 저장된게 없다면 새 최근검색어만 추가
      recentData = [newRecentData];
    }
    localStorage.setItem("recentData", JSON.stringify(recentData));
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("검색버튼 클릭");
    if (inputRef.current) {
      saveRecentSearch(inputRef.current?.value);
      //검색 버튼 클릭 시 검색form 제출
      if (formRef.current) {
        formRef.current.submit();
      }
    }
  };

  // 키보드 이벤트 설정
  const handleKeyDown = (e: KeyboardEvent) => {
    const pressedKey = e.key;
    console.log("Pressed key:", pressedKey);
    if (pressedKey === "Enter") {
      if (inputRef.current) {
        saveRecentSearch(inputRef.current?.value);
      }
      //엔터 누를 시 검색form 제출
      if (formRef.current) {
        e.preventDefault();
        formRef.current.submit();
      }
    }
  };

  useEffect(() => {
    const searchInput = inputRef.current;

    if (searchInput) {
      const handleFocus = () => {
        window.addEventListener("keydown", handleKeyDown);
      };
      const handleBlur = () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
      // 검색창에 커서 포커스 상태에서 키보드이벤트 리스너에 추가.
      searchInput.addEventListener("focus", handleFocus);
      // 커서 포커스 x -> 키보드이벤트 제거
      searchInput.addEventListener("blur", handleBlur);
    }
  }, []);

  return (
    <>
      <div className="rounded-lg bg-grayscale-0 flex flex-row items-center box- py-4 pl-11 h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
        <form action={useSearchAction} ref={formRef}>
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
