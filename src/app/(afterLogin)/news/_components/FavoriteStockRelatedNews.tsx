import Title from "../_ui/Title";
import FavoriteStockRelatedNewsItem from "./FavoriteStockRelatedNewsItem";

export default function FavoriteStockRelatedNews() {
  return (
    <>
      <section className="w-full mb-12">
        <Title title="관심종목과 관련된 뉴스" />
        <ul className="flex gap-5">
          {Array.from({ length: 3 }, (_, index) => (
            <li key={index} className="w-[33%]">
              <FavoriteStockRelatedNewsItem />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
