import React from "react";
import Search_icon from "/public/images/Search_icon.svg";
import BodyFont from "@/common/BodyFont";
import ButtonFont from "@/common/ButtonFont";
import NotFoundIcon from "/public/images/Not_found_icon.svg";
import { useParams } from "next/navigation";
import SearchInput from "../_components/SearchInput";
import Image from "next/image";
import { getStockByKeyword, TStocks } from "@/hooks/profile/useStocksHandler";
import { TstockInfoList } from "../../favorite/_components/FavoriteStockLists";
import StockItem from "@/common/StockItem/StockItem";
import Link from "next/link";

type TProps = {
  params: {
    searchedId: string;
  };
};
type TsearchStockList =
  | {
      word: string;
    }[]
  | null;
export default async function Page({ params }: TProps) {
  const { searchedId } = params;
  const decodedKeyword = decodeURIComponent(searchedId);
  const fetchStocks = async () => {
    return await getStockByKeyword(decodedKeyword);
  };
  const stockdata: TStocks[] = await fetchStocks();

  // 데이터 초기값 설정
  // let data: TsearchStockList = [{ word: "" }, { word: "검색결과2" }, { word: "검색결과3" }];
  // let searchStockList = data;

  let stockInfoList: TstockInfoList = [];
  // 타입 변환
  stockInfoList.push({
    ticker: stockdata[0].stockCode,
    name: stockdata[0].stockName,
    code: stockdata[0].stockCode,
  });

  return (
    <>
      <div className="w-[590px] h-[896px] flex flex-col relative gap-8 mx-auto mt-[56px]">
        <SearchInput />
        {/* 주식탭 */}
        <div className="w-[590px] h-auto flex flex-col">
          <div className="w-[590px] h-[32px] mb-2 flex gap-4">
            <BodyFont level="1" weight="bold" className="text-primary-900">
              주식
            </BodyFont>
            <ButtonFont weight="medium" className="border-none text-[#575757] underline !text-[14px] !leading-[20px]">
              ({stockInfoList.length})
            </ButtonFont>
          </div>
          <div className="w-full h-auto rounded-lg bg-grayscale-0 p-6 flex flex-col gap-[10px]">
            {stockInfoList ? (
              <div>
                <div className="w-[542px] h-[208px]">
                  {/* 여기 데이터 */}

                  {stockInfoList.map((a, index) => (
                    <div key={index} className="w-[264px]">
                      <Link href={`/report/${decodedKeyword}`} className="w-full">
                        <StockItem {...a} size="md" />
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-2 w-[542px] h-[40px] border-t border-gray-300 pt-4 px-[10px] text-center cursor-pointer">
                  더보기
                </div>
              </div>
            ) : (
              <div className="w-[542px] h-[208px] border flex flex-col items-center justify-center gap-[13px] ">
                <NotFoundIcon />
                <BodyFont level="2" weight="regular" className="text-primary-900">
                  조회된 검색결과가 없습니다.
                </BodyFont>
              </div>
            )}
          </div>
        </div>
        <div>
          {/* 뉴스탭 */}
          <div className="w-[590px] h-[288px] flex flex-col">
            <div className="w-[590px] h-[32px] mb-2 flex gap-4">
              <BodyFont level="1" weight="bold" className="text-primary-900">
                뉴스
              </BodyFont>
              <ButtonFont weight="medium" className="border-none text-[#575757] underline !text-[14px] !leading-[20px]">
                (12)
              </ButtonFont>
            </div>
            <div className="w-full h-auto rounded-lg bg-grayscale-0 p-6 flex flex-col gap-[10px]">
              <div className="w-full h-auto border">
                {/* 여기안에 데이터 */}
                {/* 더미데이터 */}
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4">
                  {/* <Image
                    width={640}
                    height={640}
                    alt="이미지"
                    src="rectangle-511385.jpeg"
                    className="flex-grow-0 flex-shrink-0 w-[120px] h-16 rounded-lg object-cover"
                  /> */}
                  <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3.5">
                    <p className="flex-grow-0 flex-shrink-0 w-[406px] text-base font-medium text-left text-[#121212]">
                      일본, 빅테크 규제법 내년 시행…사실상 애플·구글 규제
                    </p>
                    <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-2">
                      <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#575757]">n시간전</p>
                      <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#575757]">∙</p>
                      <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#575757]">문화일보</p>
                    </div>
                  </div>
                </div>
                {/* 데이터 끝 */}
              </div>
              <div className="mt-2 w-[542px] h-[40px] border-t border-gray-300 pt-4 px-[10px] text-center  cursor-pointer">
                더보기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
