import { BASE_URL } from "@/constants";
import Title from "../_ui/Title";
import FavoriteStockRelatedNewsItem from "./FavoriteStockRelatedNewsItem";
import { NewsResponse } from "@/types/news";

export default async function FavoriteStockRelatedNews() {
  const news = await (await fetch(`${BASE_URL}/api/news?category=stockNews&limit=3`)).json();

  return (
    <>
      <section className="w-full mb-12">
        <Title title="관심종목과 관련된 뉴스" />
        <ul className="flex gap-5">
          {news.map((item: NewsResponse, index: number) => (
            <li key={item.newsId} className="w-[33%]">
              <FavoriteStockRelatedNewsItem {...item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
