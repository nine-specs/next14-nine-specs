import PopularNews from "./_components/PopularNews";
import RecentNews from "./_components/RecentNews";
import FavoriteStockRelatedNews from "./_components/FavoriteStockRelatedNews";

export default function NewsHome() {
  return (
    <>
      <div className="px-[120px] pt-14 pb-20 overflow-hidden">
        <PopularNews />
        <FavoriteStockRelatedNews />
        <RecentNews />
      </div>
    </>
  );
}
