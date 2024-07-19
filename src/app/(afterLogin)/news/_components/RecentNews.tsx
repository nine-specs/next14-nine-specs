import ListWrap from "@/common/ListWrap";
import Title from "../_ui/Title";

import RecentNewsItem from "./RecentNewsItem";
import { BASE_URL } from "@/constants";
import { NewsResponse } from "@/types/news";

export default async function RecentNews() {
  // const news = await (await fetch(`${BASE_URL}/api/news?category=recentNews&limit=4`)).json();

  return (
    <>
      <section className="w-full mb-12">
        <Title title="최신 뉴스" />
        <ListWrap width="100%" height="148">
          {/* <ul className="flex flex-col gap-8">
            {news.map((item: NewsResponse) => (
              <li
                key={item.newsId}
                className="flex gap-5 pb-8 mt-5 border-b border-gray-400 first:mt-0 last:border-none last:pb-0"
              >
                <RecentNewsItem {...item} />
              </li>
            ))}
          </ul> */}
        </ListWrap>
      </section>
    </>
  );
}
