import BodyFont from "@/common/BodyFont";
import { Modal } from "@/common/Modal";
import CloseIcon from "/public/images/Close_icon.svg";
import React from "react";
import SearchInput from "../../discovery/_components/SearchInput";
import Search_icon from "/public/images/Search_icon.svg";
import ButtonFont from "@/common/ButtonFont";

type TAddFavoriteModal = {
  onClose: () => void;
};

// type TPopularSearchesProps = {
//   PopularSearchData: {
//     id: string;
//     stockName: string;
//   }[];
// };

export default function AddFavoriteModal({ onClose }: TAddFavoriteModal) {
  //   const popularSearchList =
  //     PopularSearchData.length != 0
  //       ? PopularSearchData
  //       : [
  //           { stockName: "테슬라" },
  //           { stockName: "애플" },
  //           { stockName: "테슬라" },
  //           { stockName: "테슬라" },
  //           { stockName: "테슬라" },
  //           { stockName: "테슬라" },
  //           { stockName: "코카콜라" },
  //           { stockName: "테슬라" },
  //           { stockName: "테슬라" },
  //           { stockName: "테슬라" },
  //         ];

  const popularSearchList = [
    { stockName: "테슬라" },
    { stockName: "애플" },
    { stockName: "테슬라" },
    { stockName: "테슬라" },
    { stockName: "테슬라" },
    { stockName: "테슬라" },
    { stockName: "코카콜라" },
    { stockName: "테슬라" },
    { stockName: "테슬라" },
    { stockName: "테슬라" },
  ];

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget);
  };

  return (
    <>
      <Modal size="S7" onClose={onClose}>
        <div className="w-full h-full p-10 flex flex-col">
          {/* 모달 타이틀 */}
          <div className="w-[714px] h-[48px] flex justify-center relative">
            <BodyFont level="1" weight="bold" className="text-primary-900 my-2">
              관심종목 추가
            </BodyFont>
            <div
              className="w-12 h-12 absolute right-0 flex justify-center items-center cursor-pointer"
              onClick={onClose}
            >
              <CloseIcon width="32px" height="32px" fill="#989898" />
            </div>
          </div>
          {/* 검색창&인기검색어&최근검색종목  */}
          <div className="flex flex-col gap-6">
            {/* 검색창 */}
            <form>
              <div className="rounded-lg bg-grayscale-0 flex justify-between  pl-4 min-h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300  mt-[31px] ">
                <input
                  className="w-[590px] h-[56px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] leading-[24px] text-primary-900 text-left flex items-center max-w-[314px] p-0"
                  name="keyword"
                  placeholder="검색어를 입력해주세요"
                />
                <div className="cursor-pointer w-12 h-12 flex justify-center items-center">
                  <Search_icon />
                </div>
              </div>
            </form>
            {/* 최근검색항목 */}
            <div className="h-[140px] w-auto flex flex-col gap-4 ">
              <div className=" w-auto h-6 flex justify-between">
                <BodyFont
                  level="3"
                  weight="medium"
                  className="text-primary-900"
                >
                  최근 검색한 종목
                </BodyFont>
                <ButtonFont
                  weight="medium"
                  className="border-none text-[#575757] underline !text-[14px] !leading-[20px] "
                >
                  전체삭제
                </ButtonFont>
              </div>
              {/* 뷰포트영역 */}
              <div className="h-[96px] w-auto flex gap-5 overflow-hidden">
                {/* 슬라이드영역 */}
                <div
                  className="h-[96px] border border-red-400 w-auto flex gap-5"
                  onClick={onClick}
                >
                  <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4"></div>
                  <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4"></div>
                  <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4"></div>
                  <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4"></div>
                  <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4"></div>
                  <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4"></div>
                </div>
              </div>
            </div>
            {/* 인기검색어*/}
            <div className="w-[714px] h-[332px]  flex flex-col gap-4">
              <div>
                <BodyFont
                  level="3"
                  weight="medium"
                  className="text-primary-900"
                >
                  인기검색어
                </BodyFont>
              </div>
              <div className="w-full h-full  flex justify-between gap-6 border border-primary-100  rounded-2xl p-6">
                <div className="w-[321px] h-full">
                  {popularSearchList.map((a, i) => {
                    if (i < 5) {
                      return (
                        <div
                          key={i}
                          className="w-[321px] h-[48px] py-2 flex justify-start gap-4 border"
                        >
                          <div className="w-[18px]">
                            <BodyFont
                              level="4"
                              weight="regular"
                              className="text-primary-900"
                            >
                              {i + 1}
                            </BodyFont>
                          </div>
                          <BodyFont
                            level="4"
                            weight="regular"
                            className="text-grayscale-600"
                          >
                            {a.stockName}
                          </BodyFont>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="w-[321px] h-full border ">
                  {popularSearchList.map((a, i) => {
                    if (i >= 5) {
                      return (
                        <div
                          key={i}
                          className="w-[321px] h-[48px] py-2 flex justify-start gap-4 border"
                        >
                          <div className="w-[18px]">
                            <BodyFont
                              level="4"
                              weight="regular"
                              className="text-primary-900"
                            >
                              {i + 1}
                            </BodyFont>{" "}
                          </div>
                          <BodyFont
                            level="4"
                            weight="regular"
                            className="text-grayscale-600"
                          >
                            {a.stockName}
                          </BodyFont>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
