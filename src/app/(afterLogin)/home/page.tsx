import AiReport from "./_components/AiReport";
import StockNews from "./_components/StockNews";
import { BASE_URL } from "@/constants";
import StockList from "./_ui/StockList";
import { StockInfo } from "@/components/Report/type/report/stockType";
import { getSession } from "@/lib/getSession";

/**
 * 유저의 메인 페이지
 */
export default async function Home() {
  const session = await getSession();

  const userStocks: StockInfo[] = await (
    await fetch(`${BASE_URL}/api/my/stocks`, {
      method: "POST",
      body: JSON.stringify({ userId: session?.user?.id }),
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
