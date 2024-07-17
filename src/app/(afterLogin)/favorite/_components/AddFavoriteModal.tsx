import BodyFont from "@/common/BodyFont";
import { Modal } from "@/common/Modal";
import CloseIcon from "/public/images/Close_icon.svg";
import React, { useRef, useState } from "react";
import SearchInput, {
  saveRecentSearch,
} from "../../discovery/_components/SearchInput";
import Search_icon from "/public/images/Search_icon.svg";
import ButtonFont from "@/common/ButtonFont";
import SlideRecentStocks from "./_components/SlideRecentStocks";
import {
  getStockByKeyword,
  getStockList,
  TStocks,
} from "@/hooks/profile/useStocksHandler";
import TextButton from "@/common/TextButton";
import SearchResultStock from "./SearchResultStock";
import { AddSearchCount } from "@/hooks/discovery/useSearchAction";

type TAddFavoriteModal = {
  onClose: () => void;
  popularSearchData: {
    id: string;
    stockName: string;
  }[];
};

export default function AddFavoriteModal({
  onClose,
  popularSearchData,
}: TAddFavoriteModal) {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<TStocks | null>(null);
  const [isMyStock, setIsMyStock] = useState<boolean>(false);

  const popularSearchList =
    popularSearchData.length != 0
      ? popularSearchData
      : [
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

  // 검색창 submit 핸들러
  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit 작동");
    if (e) e.preventDefault();

    const keyword = inputRef.current?.value;
    if (keyword) {
      const stockList = await getStockList(); // 주식종목리스트 가져오기
      let flag = false;
      // 주식종목 리스트 중 키워드에 일치하는 종목명이 있다면 flag를 true변경.
      stockList.map((item, index) => {
        if (item.stockName == keyword) {
          flag = true;
        }
      });
      console.log("flag의 상태:" + flag);
      if (flag) {
        setLoading(true);
        try {
          const result: TStocks[] | undefined = await getStockByKeyword(
            keyword,
          );
          if (result) {
            console.log("가져온 데이터: " + result[0].stockName);
            saveRecentSearch(keyword); // 최근검색어에 추가
            AddSearchCount(keyword); // 검색 카운트 +1
            setSearchData(result[0]);
          }
        } catch (error) {
          console.error("종목 검색 중 에러발생 " + error);
        } finally {
          setLoading(false);
        }
      } else {
        alert("주식종목 검색만 가능합니다.");
      }
    } else {
      alert("검색종목을 입력해주세요.");
    }
  };
  // 검색 아이콘 클릭시 handleSubmit 실행
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("검색버튼 클릭");
    e.stopPropagation();
    handleSubmit();
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
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="rounded-lg bg-grayscale-0 flex justify-between  pl-4 min-h-[56px] gap-[16px] border-[1px] border-solid border-grayscale-300  mt-[31px] items-center ">
                <input
                  className="w-[510px] h-[56px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] leading-[24px] text-primary-900 text-left flex items-center max-w-[314px] p-0"
                  name="keyword"
                  placeholder="검색어를 입력해주세요"
                  ref={inputRef}
                  autoComplete="off"
                />
                <div
                  className="cursor-pointer w-12 h-12 flex justify-center items-center"
                  onClick={onClick}
                >
                  <Search_icon />
                </div>
              </div>
            </form>
            {searchData ? (
              <>
                {" "}
                {/* 서치데이터 O 검색결과 표시 */}
                <SearchResultStock searchData={searchData} />
              </>
            ) : (
              <>
                {/* 서치데이터 X 최근검색항목&인기검색어 표시 */}
                {/* 최근검색항목 */}
                <SlideRecentStocks />
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
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
