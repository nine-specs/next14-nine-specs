import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import Time_icon2 from "/public/images/time_icon2.svg";
import Close_icon2 from "/public/images/close_icon2.svg";
import SerchInput from "./_components/SearchInput";

export default function serchPage() {
  const recentKeywordList = [
    { keyword: "테슬라", date: "06.14" },
    { keyword: "애플", date: "06.14" },
    { keyword: "구글", date: "06.14" },
    { keyword: "네이버", date: "06.14" },
    { keyword: "AMD", date: "06.14" },
    { keyword: "코카콜라", date: "06.13" },
    { keyword: "엔비디아", date: "06.13" },
    { keyword: "나이키", date: "06.12" },
    { keyword: "쿠팡", date: "06.12" },
    { keyword: "삼성", date: "06.11" },
  ];

  const popularSearchList = [
    { rank: 1, keyword: "테슬라" },
    { rank: 2, keyword: "애플" },
    { rank: 3, keyword: "테슬라" },
    { rank: 4, keyword: "테슬라" },
    { rank: 5, keyword: "테슬라" },
    { rank: 6, keyword: "테슬라" },
    { rank: 7, keyword: "코카콜라" },
    { rank: 8, keyword: "테슬라" },
    { rank: 9, keyword: "테슬라" },
    { rank: 10, keyword: "테슬라" },
  ];

  return (
    <div className=" w-[590px] h-[896px] flex flex-col relative gap-8  mx-auto mt-[56px]">
      {/* 검색창 */}
      <SerchInput />
      {/* 검색창 끝*/}
      {/* 최근검색어 */}
      <div className="w-[590px] h-[488px]  flex flex-col ">
        <div className="w-[590px] h-[32px] mb-2 flex justify-between items-center">
          <BodyFont level="1" weight="bold" className="text-primary-900  ">
            최근검색어
          </BodyFont>
          <ButtonFont
            weight="medium"
            className="border-none text-[#575757] underline !text-[14px] !leading-[20px] "
          >
            전체삭제
          </ButtonFont>
        </div>
        <div className="w-full h-[448px] rounded-lg bg-grayscale-0 p-6">
          <div className="w-full h-full ">
            {recentKeywordList.map((a, i) => {
              return (
                <div
                  key={i}
                  className=" w-[542px] h-[40px] flex justify-between items-center"
                >
                  <div className="w- flex items-center gap-[10px]">
                    <Time_icon2 />
                    <BodyFont
                      level="4"
                      weight="medium"
                      className="text-grayscale-600"
                    >
                      {a.keyword}
                    </BodyFont>
                  </div>
                  <div className="w-[66px] flex items-center gap-[8px]">
                    <BodyFont
                      level="5"
                      weight="regular"
                      className="text-grayscale-400"
                    >
                      {a.date}
                    </BodyFont>
                    <Close_icon2 />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 최근검색어 끝*/}
      {/* 인기검색어 */}
      <div className="w-[590px] h-[288px]   flex flex-col ">
        <div className="w-[590px] h-[32px] mb-2 flex gap-4">
          <BodyFont level="1" weight="bold" className="text-primary-900">
            인기검색어
          </BodyFont>
          <ButtonFont
            weight="medium"
            className="border-none text-[#575757] underline !text-[14px] !leading-[20px] "
          >
            00:00 기준
          </ButtonFont>
        </div>
        <div className="w-full h-[248px] rounded-lg bg-grayscale-0 p-6">
          <div className="w-full h-full  flex justify-between gap-4">
            <div className="w-[263px] h-full">
              {popularSearchList.map((a, i) => {
                if (i < 5) {
                  return (
                    <div
                      key={i}
                      className="w-[263px] h-[40px] py-2 flex justify-start gap-4"
                    >
                      <div className="w-[18px]">
                        <BodyFont
                          level="4"
                          weight="regular"
                          className="text-primary-900"
                        >
                          {a.rank}
                        </BodyFont>
                      </div>
                      <BodyFont
                        level="4"
                        weight="regular"
                        className="text-grayscale-600"
                      >
                        {a.keyword}
                      </BodyFont>
                    </div>
                  );
                }
              })}
            </div>
            <div className="w-[263px] h-full ">
              {popularSearchList.map((a, i) => {
                if (i >= 5) {
                  return (
                    <div
                      key={i}
                      className="w-[263px] h-[40px] py-2 flex justify-start gap-4"
                    >
                      <div className="w-[18px]">
                        <BodyFont
                          level="4"
                          weight="regular"
                          className="text-primary-900"
                        >
                          {a.rank}
                        </BodyFont>{" "}
                      </div>
                      <BodyFont
                        level="4"
                        weight="regular"
                        className="text-grayscale-600"
                      >
                        {a.keyword}
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
  );
}
