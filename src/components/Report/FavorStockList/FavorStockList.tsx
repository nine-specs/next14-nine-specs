import FavorStockItem from "./FavorStockItem";
import CardWrap from "@/common/CardWrap";
import { StockInfo } from "../type/report/stockType";
import { uuid } from "uuidv4";
interface Props {
  stockInfo: StockInfo;
}

/**
 * 관심종목 리스트 컴포넌트
 * @param {Props} { stockInfo[] } 조회할 종목 정보들
 * @returns
 */
export default async function FavorStockList({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const stockInfo2 = [
    stockInfo,
    {
      ticker: "AAPL",
      name: "애플",
      code: "AAPL.O",
    },
    {
      ticker: "AAPL",
      name: "애플",
      code: "AAPL.O",
    },
  ]; // 데이터 예시

  return (
    <>
      <CardWrap width="387px" height="334px" padding>
        <FavorStockItem stockInfo={stockInfo}>
          <div className="flex gap-3 justify-between m-4">
            <button className="px-7  border boder-black p-2">삭제</button>
            <button className="px-7 border boder-black p-2">삭제</button>
          </div>
        </FavorStockItem>
      </CardWrap>
      {/* {stockInfo &&
        stockInfo2.map((stockInfo) => (
          <div className="w-[387px] mb-3 " key={uuid()}>
            <CardWrap width="387px" height="304px" padding>
              <FavorStockItem stockInfo={stockInfo} />
            </CardWrap>
          </div>
        ))} */}
    </>
  );
}
