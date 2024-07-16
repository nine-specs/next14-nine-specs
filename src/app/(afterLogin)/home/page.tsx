import AiReport from "./_components/AiReport";
import StockNews from "./_components/StockNews";
import { BASE_URL } from "@/constants";
import StockList from "./_ui/StockList";

export type StockType = {
  stockId: string;
  stockName: string;
  stockCode: string;
};

/**
 * 유저의 메인 페이지
 */
export default async function Home() {
  const userStocks: StockType[] = await (
    await fetch(`${BASE_URL}/api/user/stock`, {
      method: "POST",
      body: JSON.stringify({ userId: "yLGm8xFA6JKiRip7p0hn" }),
    })
  ).json();

  return (
    <main className="w-[1200px] mx-auto my-[56px] flex flex-col gap-12">
      <AiReport stocks={userStocks} />
      <div className="flex gap-5">
        <StockList stocks={[]} title="최근 조회" />
        <StockList stocks={userStocks} title="관심 종목" />
      </div>
      <StockNews />
    </main>
  );
}
