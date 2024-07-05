import Link from "next/link";
import Image from "next/image";

import ListWrap from "@/common/ListWrap";
import Title from "../_ui/Title";
import Heading from "../_ui/Heading";
import BodyFont from "@/common/BodyFont";

import SAMPLE_04 from "../../../../../public/images/news/NewsSample_04.png";
import RecentNewsItem from "./RecentNewsItem";

export default function RecentNews() {
  return (
    <>
      <section className="w-full mb-12">
        <Title title="최신 뉴스" />
        <ListWrap width="100%" height="148">
          <ul className="flex flex-col gap-8">
            {Array.from({ length: 5 }, (_, index) => (
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
