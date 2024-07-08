"use client";
import React, { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import BodyFont from "@/common/BodyFont";
import { getMyStocks, getStockList } from "@/hooks/profile/useStocksHandler";

let addStockArr: string[] = [];

type Stock = {
  stockId: string;
};

type TMyStocks = string;

export default function DropDownB() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [myStock, setMyStock] = useState<string>("#관심 종목을 추가해주세요");
  const [stockList, setStockList] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const myStocks = await getMyStocks();
        console.log("내종목:" + myStock);
        const stockList = await getStockList();
        setStockList(
          stockList || [
            { stockId: "애플 ∙ APPL" },
            { stockId: "아마존 ∙ AMZN" },
            { stockId: "어도비 ∙ ADBE" },
            { stockId: "AMD ∙ AMD" },
          ],
        );

        if (myStocks.length > 0) {
          const formattedStock = myStocks.map((a) => "#" + a).join(" ");
          setMyStock(formattedStock);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    if (inputValue === "#") {
      setShowDropDown(true);
    } else if (!inputValue) {
      setShowDropDown(false);
    }
  };

  const selectOption = (e: MouseEvent<HTMLSpanElement>) => {
    setMyStock(" ");
    const target = e.target as HTMLSpanElement;
    const text = target.innerText;
    const stockNameText = text.split("∙")[0].trim().split("#")[1].trim();
    console.log("addStockArr : " + addStockArr);
    console.log("stockNameText : " + stockNameText);

    if (addStockArr.length < 4) {
      addStockArr.push("#" + stockNameText);
    }

    const addStocksStr = addStockArr.join(" ");
    setMyStock(addStocksStr);

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
              className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-900 text-left flex items-center max-w-[314px] p-0 placeholder-grayscale-900"
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
