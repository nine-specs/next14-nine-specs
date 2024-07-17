"use client";
import React, {
  useEffect,
  useState,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
} from "react";
import BodyFont from "@/common/BodyFont";
import { getMyStocks, getStockList } from "@/hooks/profile/useStocksHandler";
import { DropDownCProps } from "./profiletest";
type Stock = {
  stockId: string;
};
type TMyStocks = string;

export default function DropDownC({
  myStock,
  setMyStock,
  showDropDown,
  setShowDropDown,
  selectOption,
  myStockArr,
  setStockArr,
}: DropDownCProps) {
  const [stockList, setStockList] = useState<Stock[]>([]);
  // DB 저장된 주식종목들 불러오기
  useEffect(() => {
    async function fetchData() {
      try {
        const stockList = await getStockList();
        setStockList(stockList);
      } catch (error) {
        console.error("내관심종목&주식종목 가져오는 중 에러발생:", error);
      }
    }
    fetchData();
  }, []);
  // '#'입력시 드롭다운 이벤트
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 사용자 입력한 값 가져오기
    const inputValue = e.target.value;
    // value의 마지막 문자열 가져오기(사용자가 방금 입력한 값)
    let lastValueStr = inputValue[inputValue.length - 1];
    //input에 입력된값을 myStock에 저장
    setMyStock(inputValue);
    console.log(inputValue);
    console.log(lastValueStr);
    //
    if (lastValueStr === "#") {
      setShowDropDown(true);
    } else if (!inputValue) {
      setShowDropDown(false);
    }
  };
  // 선택된 관심종목 제거
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // 관심종목 배열에 값이 있다면 이벤트실행
      if (myStockArr.length > 0) {
        e.preventDefault();
        console.log("백스페이스 키 입력됨");
        // 원하는 로직 추가
        // 관심종목 배열 마지막 요소 제거
        let copyArr = [...myStockArr];
        copyArr.pop();
        //  set관심종목 배열로 저장
        setStockArr(copyArr);
        // 이놈을 str로 바꾼뒤
        const addStocksStr = copyArr.join(" ");
        // setmyStock 에 넣는다.
        setMyStock(addStocksStr);
        setShowDropDown(false);
      }
    }
  };

  return (
    <>
      <div className=" w-[386px] mb-[56px]">
        <BodyFont level="4" weight="medium" className="text-primary-900 mb-1">
          관심종목
        </BodyFont>
        <div className="w-auto h-auto relative">
          <div className="self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
            <input
              name="myStock"
              className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-900 text-left flex items-center max-w-[314px] p-0 "
              placeholder="#관심 종목을 추가해주세요"
              onChange={onChange}
              onKeyDown={onKeyDown}
              id="stockInput"
              value={
                myStock !== "#관심 종목을 추가해주세요" ? myStock : undefined
              }
            />
          </div>
        </div>
        {showDropDown && (
          <div className="flex flex-col justify-center items-start gap-0 z-10 absolute border border-grayscale-300 rounded-lg w-[386px] h-auto max-h-[244px] overflow-auto bg-grayscale-0 mt-1">
            {stockList.map((item, index) => (
              <div
                key={index}
                className="flex-grow w-full hover:bg-gray-100 box-border py-4 pl-4 pr-[56px]"
              >
                <div
                  className="w-[314px] h-[24px] cursor-pointer"
                  onClick={selectOption}
                >
                  <BodyFont
                    level="4"
                    weight="regular"
                    className="text-gray-900"
                  >
                    <span className="m-0 w-0">{`# ${item.stockId}`}</span>
                  </BodyFont>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
