"use client";
import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import BodyFont from "@/common/BodyFont";
import { getMyStocks, getStockList } from "@/hooks/profile/useStocksHandler";
let addStockArr: string[] = [];
type Stock = {
  stockId: string;
};
type TMyStocks = string;
export default function DropDownC({
  giveStock,
}: {
  giveStock: (value: string) => void;
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [myStock, setMyStock] = useState<string>("#관심 종목을 추가해주세요");
  const [stockList, setStockList] = useState<Stock[]>([]);
  // DB 저장된 내 관심종목 & 주식종목들 불러오기
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
    const inputValue = e.target.value;
    console.log(inputValue);
    if (inputValue === "#") {
      setShowDropDown(true);
    } else if (!inputValue) {
      setShowDropDown(false);
    }
  };
  // 종목선택 이벤트
  const selectOption = (e: MouseEvent<HTMLSpanElement>) => {
    setMyStock(" ");
    const target = e.target as HTMLSpanElement;
    const text = target.innerText;
    const stockNameText = text.split("∙")[0].trim().split("#")[1].trim();
    console.log("addStockArr : " + addStockArr);
    console.log("stockNameText : " + stockNameText);
    // 선택된 주식종목은 최대 4개까지만 표시
    if (addStockArr.length < 4) {
      addStockArr.push("#" + stockNameText);
    }
    // input value에 선택된 주식종목 설정
    const addStocksStr = addStockArr.join(" ");
    setMyStock(addStocksStr);
    giveStock(myStock);
    // '#' 비우기
    const input = document.getElementById("stockInput") as HTMLInputElement;
    input.value = "";
    setShowDropDown(false);
  };
  return (
    <>
      <div className=" w-[386px] h-[184px] mb-[56px]">
        <BodyFont level="4" weight="medium" className="text-primary-900 mb-1">
          관심종목
        </BodyFont>
        <div className="w-auto h-auto relative">
          <div className="self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
            <input
              className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-900 text-left flex items-center max-w-[314px] p-0 "
              placeholder={myStock}
              onChange={onChange}
              id="stockInput"
            />
            <input
              className="hidden"
              id="hiddenInput"
              name="myStock"
              value={
                myStock !== "#관심 종목을 추가해주세요" ? myStock : undefined
              }
              readOnly
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