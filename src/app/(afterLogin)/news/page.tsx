import PopularNews from "./_components/PopularNews";
import RecentNews from "./_components/RecentNews";
import RelatedNews from "./_components/RelatedNews";

export default function NewsHome() {
  return (
    <>
      <div className="px-[120px] pt-14 pb-20 overflow-hidden">
        <PopularNews />
        <RelatedNews />
        <RecentNews />
      </div>
    </>
  );
}
