import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import FavoriteStockItem from "./FavoriteStockItem";
import AddFavoriteModal from "./AddFavoriteModal";
import { TMyStocks, TStocks } from "@/hooks/profile/useStocksHandler";
import FavoriteTitleSection from "./FavoriteTitleSection";
import CardWrap from "@/common/CardWrap";
import FavorStockItem from "@/components/Report/FavorStockList/FavorStockItem";
import FavoriteStockButtons from "./FavoriteStockButtons";

type TFavoriteStockList = {
  // 내관심종목 데이터 타입
  data: TMyStocks[];
  popularSearchData: {
    stockName: string;
    stockId: string;
    stockCode: string;
  }[];
  userId: string;
};
const stockInfo = {
  ticker: "AAPL",
  name: "애플",
  code: "AAPL.O",
};

export type TstockInfoList = {
  ticker: string;
  name: string;
  code: string;
}[];

export default function FavoriteStockLists({ data, popularSearchData, userId }: TFavoriteStockList) {
  let stockInfoList: TstockInfoList = [];

  data.forEach((a, i) => {
    stockInfoList.push({
      ticker: a.stockId,
      name: a.stockName,
      code: a.stockCode,
    });
  });

  return (
    <>
      <div className="w-[1214px] h-auto  flex flex-col justify-between gap-6 mx-auto  mt-[56px]">
        <FavoriteTitleSection popularSearchData={popularSearchData} />
        <div className="flex flex-col justify-between gap-6">
          {/* 관심종목 리스트 */}
          <div className="w-[1214px] min-h-[360px]  flex  gap-[19px] flex-wrap justify-start">
            {/* <FavoriteStockItem myStock={item.stockName} key={index} /> */}
            {stockInfoList.map((item, index) => (
              <CardWrap width="392px" height="360px" padding key={index}>
                <FavorStockItem stockInfo={item}>
                  <div className="flex gap-3 justify-between w-auto">
                    <FavoriteStockButtons myStock={item.name} />
                  </div>
                </FavorStockItem>
              </CardWrap>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
