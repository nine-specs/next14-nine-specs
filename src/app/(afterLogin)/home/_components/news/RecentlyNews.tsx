import Image from "next/image";
import SubTitle from "../../_ui/SubTitle";

import BodyFont from "@/common/BodyFont";
import Link from "next/link";
import { BASE_URL } from "@/constants";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

/**
 * 최신 뉴스
 */
export default async function RecentlyNews() {
  const news = await (await fetch(`${BASE_URL}/api/my/news?category=recentNews&limit=3`)).json();

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
  const { headLine, contents, media, image, creationTime } = props;

  // relativeTime 플러그인 등록
  dayjs.extend(relativeTime);
  // 한국어 로케일 설정
  dayjs.locale("ko");
  // 현재 시간
  const now = dayjs();
  // 과거 시간
  const pastTime = dayjs(creationTime);
  // 상대 시간 계산
  const relativeTimeString = pastTime.from(now);

  return (
    <Link href={""}>
      <article className="flex gap-5">
        <div className="rounded-2xl overflow-hidden w-[172px] h-[100px]">
          <Image src={image} alt="" width={172} height={100} className="h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <BodyFont level="3" weight="bold" className="text-grayscale-900">
              {headLine}
            </BodyFont>
            <BodyFont level="5" weight="medium" className="text-grayscale-600">
              {relativeTimeString} ∙ {media}
            </BodyFont>
          </div>
          <BodyFont level="4" weight="regular" className="line-clamp-2 text-grayscale-900">
            {contents}
          </BodyFont>
        </div>
      </article>
    </Link>
  );
};
