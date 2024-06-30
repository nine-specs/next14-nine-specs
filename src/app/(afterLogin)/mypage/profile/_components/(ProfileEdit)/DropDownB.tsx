import React, { useEffect, useState } from "react";
import Input from "@/common/Input";
import BodyFont from "@/common/BodyFont";
import { TUser } from "@/app/api/profile/route";

type Tdata = { stockId: string };

type TDropDownB = {
  profileData?: {
    profileData: TUser | undefined | null;
    setProfileData: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  };
};

let addStockArr: string[] = [];
/**관심종목 검색 시 사용할 드롭다운 박스*/
export default function DropDownB({ profileData }: TDropDownB) {
  /**드롭다운 show 이벤트 */
  const [showDropDown, setShowDropDown] = useState(false);
  // myStock 초기값 설정  (db의 myStock이 없다면  "추가해달라는 문구" )
  const [myStock, setMyStock] = useState<string>(() => {
    const profileDataStock = profileData?.profileData?.myStock;
    if (profileDataStock) {
      // myStock 배열을 해시태그 형식으로 변환
      const formattedStock = profileDataStock.map((a) => "#" + a);
      // 해시태그를 공백으로 구분하여 문자열로 결합
      return formattedStock.join(" ");
    }
    return "#관심 종목을 추가해주세요";
  });
  // profileData에서 favorite 데이터가져오기-> 나중에 다른 데이터받아올 예정
  let data: Tdata[] = profileData?.profileData?.favorite || [
    // 기본 데이터 - DB 연결 안될 시 사용
    { stockId: "애플 ∙ APPL" },
    { stockId: "아마존 ∙ AMZN" },
    { stockId: "어도비 ∙ ADBE" },
    { stockId: "AMD ∙ AMD" },
  ];

  //인풋창 # 입력시 발생이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    let inputValue = input.value;
    console.log(inputValue);
    if (inputValue == "#") {
      // # 입력시 드롭다운 show
      setShowDropDown(true);
      // # input 입력창이 비어있다면 드롭다운 닫기
    } else if (!inputValue) {
      setShowDropDown(false);
    }
  };

  // 드롭다운 옵션 선택시 발생이벤트
  const selectOption = (e: React.MouseEvent<HTMLSpanElement>) => {
    setMyStock(" ");
    //선택한 주식종목명 가져오기
    let target = e.target as HTMLSpanElement;
    let text = target.innerText;
    let stockNameText = text.split("∙")[0].trim().split("#")[1].trim();
    console.log("addStockArr : " + addStockArr);
    console.log("stockNameText : " + stockNameText);
    // 가져온 주식종목 중복제거 (추가예정)
    // 추가할 주식종목배열에 추가.최대 4개까지만.
    if (addStockArr.length < 4) {
      addStockArr.push("#" + stockNameText);
    }
    //주식종목 문자열화 + 종목간 사이간격 추가
    let addStocksStr = addStockArr.join(" ");
    // 인풋의 palceholer에 표시
    setMyStock(addStocksStr);

    // 인풋창 비우기
    const input = document.getElementById("stockInput") as HTMLInputElement;
    input.value = "";
    // input.value = myStock;

    // 드롭다운 닫기
    setShowDropDown(false);
  };

  return (
    <>
      {/*<<--인풋박스-*/}
      <div className=" w-[386px] h-[184px] mb-[56px]">
        <BodyFont level="4" weight="medium" className="text-primary-900 mb-1">
          관심종목
        </BodyFont>
        <div className="w-auto h-auto relative ">
          {/* <Input value={`${reason}`} placeholder="#애플 #테슬라"></Input> */}
          <div className="self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-0 px-[15px] h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300">
            <input
              className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-full leading-[24px] text-grayscale-900 text-left flex items-center max-w-[314px] p-0"
              placeholder={myStock}
              onChange={onChange}
              id="stockInput"
              // value={myStock}
            />
            {/* post 요청시 formdata를 보낼 input  */}
            <input
              className="hidden"
              id="hiddenInput"
              name="myStock"
              value={myStock} // 전송할 데이터
            />
          </div>
        </div>
        {/* 셀렉트박스 */}
        {showDropDown && (
          <div className="flex flex-col justify-center items-start gap-0 z-10 absolute border border-grayscale-300 rounded-lg w-[386px] h-[224px] bg-grayscale-0 mt-1">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex-grow w-full  hover:bg-gray-100  box-border py-4 pl-4 pr-[56px]"
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
              );
            })}
          </div>
        )}
        {/* 셀렉트박스 끝*/}
      </div>
      {/*<<--인풋박스-*/}
    </>
  );
}
