import Image from "next/image";
import SubTitle from "../../_ui/SubTitle";

import BodyFont from "@/common/BodyFont";
import Link from "next/link";
import { BASE_URL } from "@/constants";

/**
 * 주요 뉴스
 */
export default async function MainNews() {
  const news = await (await fetch(`${BASE_URL}/api/my/news?category=mainNews&limit=1`)).json();

  const { image, headLine, contents } = news[0];
  return (
    <>
      <div>
        <SubTitle subTitle="주요 뉴스" />
        <Link href={""}>
          <article className="p-12 border border-primary-100 rounded-2xl flex gap-5">
            <div className="rounded-3xl overflow-hidden w-[338px] h-[240px]">
              <Image src={image} alt="" width={338} height={240} className="h-full object-cover" />
            </div>
            <div className="flex-1">
              <BodyFont level="1" weight="medium">
                {headLine}
              </BodyFont>
              <hr className="my-6 border-none h-[1px] bg-gray-400" />
              <BodyFont level="3" weight="regular" className="line-clamp-5 text-[#464646]">
                {contents}
              </BodyFont>
            </div>
          </article>
        </Link>
      </div>
    </>
  );
}
