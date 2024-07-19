import PopularNews from "./_components/PopularNews";
import RecentNews from "./_components/RecentNews";
import FavoriteStockRelatedNews from "./_components/FavoriteStockRelatedNews";
import { getStockNews } from "@/service/news/crawler/getStockNews";
import { getPopularNews } from "@/service/news/crawler/getPopularNews";
import { getStockWorldNews } from "@/service/news/crawler/getStockWorldNews";

export default function NewsHome() {
  //   getStockNews();
  //   getPopularNews();
  //   getStockWorldNews();
  return (
    <>
      <div className="max-w-[1200px] pt-14 pb-20 overflow-hidden">
        <PopularNews />
        <FavoriteStockRelatedNews />
        <RecentNews />
      </div>
    </>
  );
}
