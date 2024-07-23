import AiReport from "./_components/AiReport";
import StockNews from "./_components/StockNews";
import { getSession } from "@/lib/getSession";
import FavoriteStocks from "./_components/FavoriteStocks";
import RecentlyViewed from "./_components/RecentlyViewed";

/**
 * 유저의 메인 페이지
 */
export default async function Home() {
  const session = await getSession();
  const userId = session?.user?.id || "";
  const userName = session?.user?.name || "";

  return (
    <main className="w-[1200px] mx-auto my-[56px] flex flex-col gap-12">
      <AiReport userName={userName} userId={userId} />
      <div className="flex gap-5">
        <RecentlyViewed />
        <FavoriteStocks userId={userId} />
      </div>
      <StockNews userName={userName} />
    </main>
  );
}
