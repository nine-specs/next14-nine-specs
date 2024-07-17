// import IconButton from "@/common/IconButton";
import BodyFont from "@/common/BodyFont";
import SubTitle from "../../_ui/SubTitle";
import Link from "next/link";
import { BASE_URL } from "@/constants";

/**
 * 관심 종목 뉴스
 */
export default async function FavoriteStockNews() {
  const news = await (
    await fetch(`${BASE_URL}/api/news?category=popularNews&limit=3`)
  ).json();

  // console.log("🚀 ~ FavoriteStockNews ~ news:", news);

  return (
    <>
      <div>
        <SubTitle subTitle="관심 종목" />
        <ul className="flex gap-5">
          {news.map((article: any) => (
            <li
              key={article.newsId}
              className="w-1/3 h-[100px] border border-primary-200 rounded-2xl"
            >
              <StockCard {...article} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/**
 * 종목 카드
 */
const StockCard = (props: any) => {
  const { creationTime, headLine } = props;
  return (
    <Link href={""}>
      <article className="flex justify-between items-center px-4 py-6">
        <div className="w-[243px]">
          <BodyFont level="5" weight="regular" className="text-grayscale-400">
            {creationTime}
          </BodyFont>
          <BodyFont level="2" weight="bold" className="truncate">
            {headLine}
          </BodyFont>
        </div>
        <div className="w-12 h-12 bg-black rounded-full flex justify-center items-center text-white">
          icon
        </div>
      </article>
    </Link>
  );
};
