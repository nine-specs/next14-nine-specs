import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import StockItem from "@/common/StockItem/StockItem";
import { StockInfo } from "@/components/Report/type/report/stockType";
import { BASE_URL } from "@/constants";
import { stockListByStockName } from "@/hooks/discovery/useSearchAction";
import { TStocks } from "@/hooks/profile/useStocksHandler";
import React, { useEffect, useRef, useState } from "react";
type TstockInfoList = {
  ticker: string;
  name: string;
  code: string;
}[];
type TrecentData = { keyword: string; date: string }[];
export default function SlideRecentStocks() {
  const [startX, setStartX] = useState(0);
  const [currentMovedX, setCurrentMovedX] = useState(0);
  const [totalMovedX, setTotalMovedX] = useState(0);
  const [isMouseClick, setMouseClick] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const [recentKeywordList, setRecentKeywordList] = useState<TrecentData>([]);
  const [stockInfoList, seStockInfoList] = useState<TstockInfoList>([]);
  // 로컬스토리지에서 최근 검색어 데이터 가져오기
  useEffect(() => {
    const fetchRecentStockData = async () => {
      const savedRecentData = localStorage.getItem("recentData");
      if (savedRecentData) {
        const parsedRecentData: TrecentData = JSON.parse(savedRecentData);
        setRecentKeywordList(parsedRecentData);
        console.log("최근검색어" + parsedRecentData);

        const stockNameList = parsedRecentData.map((item) => item.keyword);
        if (stockNameList.length > 0) {
          // 빈 배열이 아닌 경우에만 쿼리 실행
          const recentStockDataList = await stockListByStockName(stockNameList);
          if (recentStockDataList) {
            seStockInfoList(recentStockDataList);
            console.log("최근검색어의 주식데이터" + recentStockDataList[0]);
          }
        }
      }
    };

    fetchRecentStockData();
  }, []);

  /**최근 검색어 모두삭제 클릭이벤트 */
  const deleteAllRecentWord = async () => {
    localStorage.setItem("recentData", JSON.stringify([]));
    // 스테이트 변경
    setRecentKeywordList([]);
  };

  // 슬라이드 클릭 다운이벤트
  const onDownEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (slideRef.current) {
      const childCount = slideRef.current.childElementCount;
      // 주식종목이 3개 이상일떄 만 슬라이드 이벤트발생
      if (childCount >= 3) {
        //시작점 x위치
        setStartX(e.clientX);
        console.log("시작위치:" + startX);
        setMouseClick(true);
      }
    }
  };
  const onMoveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseClick) {
      //이동된 거리 = 이동한 x위치 - 시작점 x위치
      setCurrentMovedX(e.clientX - startX);
    }
  };
  const onUpEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (slideRef.current) {
      const childCount = slideRef.current.childElementCount;
      // 주식종목이 3개 이상일떄 만 슬라이드 이벤트발생
      if (childCount >= 3) {
        setTotalMovedX(totalMovedX + currentMovedX);
        // 슬라이드 컨테이너 너비 구하기
        let slideWidthEs = 0;
        const slideWidth = slideRef.current.getBoundingClientRect().width;
        slideWidthEs = Math.floor(slideWidth);
        console.log("슬라이드 너비:", slideWidthEs);

        // 슬라이드 컨테이너 너비가 뷰포트끝에 걸치는 x축위치 구하기
        let viewPortEnd = slideWidthEs - 714;
        console.log("엔드" + viewPortEnd);
        // 슬라이드 영역이 뷰포트 우측을 넘어가지 못하도록 설정
        if (totalMovedX + currentMovedX < -viewPortEnd) {
          setCurrentMovedX(0);
          setTotalMovedX(-viewPortEnd);
        }
        // 슬라이드 영역이 뷰포트 좌측을 넘어가지 못하도록 설정
        if (totalMovedX + currentMovedX > 0) {
          setCurrentMovedX(0);
          setTotalMovedX(0);
        }
        console.log("놓여진 x츅위치:" + e.clientX);
        console.log("totalMovedX:" + totalMovedX);
        setCurrentMovedX(0);

        setMouseClick(false);
      }
    }
  };

  return (
    <>
      {recentKeywordList.length >= 1 && (
        <div className="h-[140px] w-auto flex flex-col gap-4 ">
          <div className=" w-auto h-6 flex justify-between">
            <BodyFont level="3" weight="medium" className="text-primary-900">
              최근 검색한 종목
            </BodyFont>
            <ButtonFont
              weight="medium"
              className="border-none text-[#575757] underline !text-[14px] !leading-[20px] "
              onClick={deleteAllRecentWord}
            >
              전체삭제
            </ButtonFont>
          </div>
          {/* 뷰포트영역 */}
          <div className="h-[96px] w-auto flex gap-5 overflow-hidden">
            {/* 슬라이드영역 */}
            <div
              className="h-[96px]  w-auto flex gap-5 duration-100 transition-transform "
              onMouseDown={onDownEvent}
              onMouseMove={onMoveEvent}
              onMouseUp={onUpEvent}
              ref={slideRef}
              style={{
                transform: `translateX(${totalMovedX + currentMovedX}px)`,
              }}
            >
              {stockInfoList.map((a, i) => {
                return (
                  <div
                    key={i}
                    className="border border-primary-100  rounded-2xl min-w-[255px] min-h-[96px] flex-shrink-0 py-6 px-4"
                  >
                    {/* <StockItem {...a} size="md" /> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
