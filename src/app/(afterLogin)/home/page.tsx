import AiReport from "./_components/AiReport";
import StockNews from "./_components/StockNews";
import { BASE_URL } from "@/constants";
import StockList from "./_ui/StockList";
import { StockInfo } from "@/components/Report/type/report/stockType";

/**
 * 유저의 메인 페이지
 */
export default async function Home() {
  const userStocks: StockInfo[] = await (
    await fetch(`${BASE_URL}/api/user/stock`, {
      method: "POST",
      body: JSON.stringify({ userId: "tvJNWYbo9hcAI2Sn0QtC" }),
    })
  ).json();

  // const news = await (
  //   await fetch(`${BASE_URL}/api/news?category=mainNews&limit=1`)
  // ).json();

  // console.log("🚀 ~ Home ~ news:", news[0].creationTime, news[0].headLine);
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
