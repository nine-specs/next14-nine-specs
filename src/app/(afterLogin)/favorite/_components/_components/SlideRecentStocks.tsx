import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import React, { useRef, useState } from "react";

export default function SlideRecentStocks() {
  const [startX, setStartX] = useState(0);
  const [currentMovedX, setCurrentMovedX] = useState(0);
  const [totalMovedX, setTotalMovedX] = useState(0);
  const [isMouseClick, setMouseClick] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null); //

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
      <div className="h-[140px] w-auto flex flex-col gap-4 ">
        <div className=" w-auto h-6 flex justify-between">
          <BodyFont level="3" weight="medium" className="text-primary-900">
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
            className="h-[96px] border border-red-400 w-auto flex gap-5 duration-100 transition-transform "
            onMouseDown={onDownEvent}
            onMouseMove={onMoveEvent}
            onMouseUp={onUpEvent}
            ref={slideRef}
            style={{
              transform: `translateX(${totalMovedX + currentMovedX}px)`,
            }}
          >
            <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4">
              1번
            </div>
            <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4">
              2번
            </div>
            <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4">
              2번
            </div>
            <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4">
              2번
            </div>
            <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4">
              2번
            </div>
            <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4">
              2번
            </div>
            <div className="border border-primary-100  rounded-2xl w-[255px] h-[96px] flex-shrink-0 py-6 px-4">
              2번
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
