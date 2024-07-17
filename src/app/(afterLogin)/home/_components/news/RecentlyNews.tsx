import Image from "next/image";
import SubTitle from "../../_ui/SubTitle";

import MOCKUP_IMG from "../../../../../../public/images/main/background_img.png";
import BodyFont from "@/common/BodyFont";
import Link from "next/link";
import { BASE_URL } from "@/constants";

/**
 * 최신 뉴스
 */
export default async function RecentlyNews() {
  const news = await (
    await fetch(`${BASE_URL}/api/news?category=recentNews&limit=3`)
  ).json();

  // console.log("🚀 ~ FavoriteStockNews ~ news:", news);
  return (
    <>
      <div>
        <SubTitle subTitle="최신 뉴스" />
        <ul className="p-12 border border-primary-100 rounded-2xl">
          {news.map((article: any) => (
            <li
              className="border-b border-gray-400 pb-8 pt-8 first:pt-0 last:border-none last:pb-0"
              key={article.newsId}
            >
              <NewsItem {...article} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/**
 * 뉴스 아이템
 */
const NewsItem = (props: any) => {
  const { headLine, contents, media, image } = props;
  return (
    <Link href={""}>
      <article className="flex gap-5">
        <div className="rounded-2xl overflow-hidden w-[172px] h-[100px]">
          <Image
            src={image}
            alt=""
            width={172}
            height={100}
            className="h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <BodyFont level="3" weight="bold" className="text-grayscale-900">
              {headLine}
            </BodyFont>
            <BodyFont level="5" weight="medium" className="text-grayscale-600">
              n시간전 ∙ {media}
            </BodyFont>
          </div>
          <BodyFont
            level="4"
            weight="regular"
            className="line-clamp-2 text-grayscale-900"
          >
            {contents}
          </BodyFont>
        </div>
      </article>
    </Link>
  );
};
