import ListWrap from "@/common/ListWrap";
import Title from "../_ui/Title";

import RecentNewsItem from "./RecentNewsItem";

export default function RecentNews() {
  return (
    <>
      <section className="w-full mb-12">
        <Title title="최신 뉴스" />
        <ListWrap width="100%" height="148">
          <ul className="flex flex-col gap-8">
            {Array.from({ length: 4 }, (_, index) => (
              <li
                key={index}
                className="flex gap-5 pb-8 mt-5 border-b border-gray-400 first:mt-0 last:border-none last:pb-0"
              >
                <RecentNewsItem />
              </li>
            ))}
          </ul>
        </ListWrap>
      </section>
    </>
  );
}
