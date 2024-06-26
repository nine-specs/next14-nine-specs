import AiReport from "./_components/AiReport";
import RecentlyViewed from "./_components/RecentlyViewed";
import FavoriteStocks from "./_components/FavoriteStocks";
import StockNews from "./_components/StockNews";

/**
 * 로그인한 유저의 메인 페이지
 */
export default function Home() {
  return (
    <main className="w-[1200px] mx-auto my-[56px] flex flex-col gap-12">
      <AiReport />
      <div className="flex gap-5">
        <RecentlyViewed />
        <FavoriteStocks />
      </div>
      <StockNews />
    </main>
  );
}
