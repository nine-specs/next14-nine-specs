import RelatedStock from "./RelatedStock";
import RelatedNews from "./RelatedNews";
import { StockInfo } from "@/components/Report/type/report/stockType";
import BodyFont from "@/common/BodyFont";

export default function RelatedList({ stockList }: { stockList: StockInfo[] }) {
  return (
    <>
      <div className="flex flex-col gap-5">
        {stockList.length > 0 ? (
          <RelatedStock stockList={stockList} />
        ) : (
          <div className="w-full h-[310px] bg-white rounded-xl p-8">
            <BodyFont level="3" weight="bold" className="text-primary-900">
              현재 뉴스와 관련된 주식
            </BodyFont>
            <div className="flex justify-center items-center w-full h-full text-grayscale-700">
              <p>관련있는 주식 종목이 없습니다.</p>
            </div>
          </div>
        )}
        <RelatedNews />
      </div>
    </>
  );
}
