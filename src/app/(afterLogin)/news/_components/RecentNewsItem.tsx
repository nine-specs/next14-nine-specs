import Link from "next/link";
import Image from "next/image";

import Heading from "../_ui/Heading";
import BodyFont from "@/common/BodyFont";
import { getTimeAgo } from "@/service/news/setTimestampToDate";

export default function RecentNewsItem(props: any) {
  const { headLine, contents, media, image, newsId, creationTime } = props;

  return (
    <>
      <div className="rounded-2xl w-[252px] h-[114px] overflow-hidden">
        <Image src={image} alt="" width={252} height={148} className="object-cover object-center h-auto" />
      </div>
      <div className="flex-1">
        <Link href={`news/${newsId}`}>
          <div className="mb-4 flex justify-between items-center">
            <Heading heading={`${headLine}`} />
            <aside className="text-grayscale-600">
              <BodyFont level="5" weight="medium">
                {getTimeAgo(creationTime)} ∙ {media}
              </BodyFont>
            </aside>
          </div>
          <BodyFont level="4" weight="regular" className="text-grayscale-900 line-clamp-3">
            {contents}
          </BodyFont>
        </Link>
      </div>
    </>
  );
}
