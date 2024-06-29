import React, { useState } from "react";
import DownIcon from "/public/images/Down_icon.svg";
import UpIcon from "/public/images/Up_icon.svg";
import Input from "@/common/Input";
import BodyFont from "@/common/BodyFont";

export default function DropDownA() {
  /**드롭다운 show 이벤트 */
  const [showDropDown, setShowDropDown] = useState(false);
  const [reason, setReason] = useState("탈퇴 사유를 선택해주세요"); // 탈퇴 사유
  const onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    setShowDropDown(!showDropDown);
    console.log(showDropDown + "클릭");
  };

  // 드롭다운 옵션 선택시  발생이벤트
  const selectOption = (e: React.MouseEvent<HTMLSpanElement>) => {
    let target = e.target as HTMLSpanElement;
    setReason(target.innerText);
  };

  return (
    <>
      {/*<<--인풋박스-*/}
      <div className=" w-[386px] h-[184px] mt-[40px] mb-[56px]">
        <BodyFont level="4" weight="medium" className="text-primary-900 mb-1">
          회원탈퇴 사유
        </BodyFont>
        <div className="w-auto h-auto relative ">
          <Input value={`${reason}`}></Input>
          <button
            className="absolute  top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={onClick}
          >
            {/* {showDropDown ? <DownIcon /> : <UpIcon />} 업아이콘 사이즈문제로 주석처리  */}
            <DownIcon />
          </button>
        </div>
        {/* 셀렉트박스 */}
        {showDropDown && (
          <div className="flex flex-col justify-center items-start gap-0 z-10 absolute border border-grayscale-300 rounded-lg w-[386px] h-[286px] bg-grayscale-0 mt-1">
            <div className="flex-grow w-full  hover:bg-gray-100  box-border py-4 pl-4 pr-[56px] ">
              <div
                className="w-[314px] h-[24px] cursor-pointer"
                onClick={selectOption}
              >
                <BodyFont level="4" weight="regular" className="text-gray-900">
                  <span className="m-0 w-0" id="reaseon1">
                    이용이 불편하고 장애가 많아서
                  </span>
                </BodyFont>
              </div>
            </div>
            <div className="flex-grow w-full  hover:bg-gray-100 transition duration-200 box-border py-4 pl-4 pr-[56px] ">
              <div
                className="w-[314px] h-[24px] cursor-pointer"
                onClick={selectOption}
              >
                <BodyFont level="4" weight="regular" className="text-gray-900">
                  <span className="m-0 w-0" id="reaseon2">
                    다른 서비스가 더 좋아서
                  </span>
                </BodyFont>
              </div>
            </div>
            <div className="flex-grow w-full  hover:bg-gray-100 transition duration-200 box-border py-4 pl-4 pr-[56px] ">
              <div
                className="w-[314px] h-[24px] cursor-pointer"
                onClick={selectOption}
              >
                <BodyFont level="4" weight="regular" className="text-gray-900">
                  <span className="m-0 w-0" id="reaseon3">
                    사용 빈도가 낮아서
                  </span>
                </BodyFont>
              </div>
            </div>
            <div className="flex-grow w-full  hover:bg-gray-100 transition duration-200 box-border py-4 pl-4 pr-[56px] ">
              <div
                className="w-[314px] h-[24px] cursor-pointer"
                onClick={selectOption}
              >
                <BodyFont level="4" weight="regular" className="text-gray-900">
                  <span className="m-0 w-0" id="reaseon4">
                    콘텐츠 불만
                  </span>
                </BodyFont>
              </div>
            </div>
            <div className="flex-grow w-full  hover:bg-gray-100 transition duration-200 box-border py-4 pl-4 pr-[56px] ">
              <div
                className="w-[314px] h-[24px] cursor-pointer"
                onClick={selectOption}
              >
                <BodyFont level="4" weight="regular" className="text-gray-900">
                  <span className="m-0 w-0" id="reaseon5">
                    기타
                  </span>
                </BodyFont>
              </div>
            </div>
          </div>
        )}
        {/* 셀렉트박스 끝*/}
        <BodyFont
          level="4"
          weight="medium"
          className="text-primary-900 mt-4 mb-1"
        >
          비밀번호 입력
        </BodyFont>
        <Input type="password"></Input>
      </div>
      {/*<<--인풋박스-*/}
    </>
  );
}
