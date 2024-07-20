import { StockInfo } from "../type/report/stockType";
import dynamic from "next/dynamic";
import { StockReport } from "./FavorStockReport";
import FevorStockHeader from "./FevorStockHeader";
import Link from "next/link";
const FavorStockReport = dynamic(() => import("./FavorStockReport"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse h-full ">
      <StockReport />
    </div>
  ),
});
interface Props {
  stockInfo: StockInfo | undefined;
  children?: React.ReactNode;
}
export default async function FavorStockItem({ stockInfo, children }: Props) {
  if (!stockInfo) return null;
  const { code, name } = stockInfo;

  return (
    <div className="flex flex-col">
      <article className="flex flex-col justify-between w-full h-full gap-4 ">
        {/* 관심 종목 헤더 */}
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/report/${name}`}>
          <FevorStockHeader stockInfo={stockInfo} />
        </Link>
        {/* 차트와 리포트 */}
        <FavorStockReport code={code} />
      </article>
      {children}
    </div>
  );
}
