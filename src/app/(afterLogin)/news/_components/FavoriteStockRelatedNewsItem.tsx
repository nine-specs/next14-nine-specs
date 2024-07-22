import Image from "next/image";

import BodyFont from "@/common/BodyFont";
import CardWrap from "@/common/CardWrap";
import MoreButton from "../_ui/MoreButton";
import useTimestampToDate from "@/hooks/common/useTimestampToDate";

export default function FavoriteStockRelatedNewsItem(props: any) {
  const { headLine, media, image, creationTime, relatedStock } = props;
  const { timeAgo } = useTimestampToDate(creationTime);

  return (
    <>
      <CardWrap className="overflow-hidden" width="100%" height="420" padding={false}>
        <div className="w-auto h-[230px] overflow-hidden">
          {image ? (
            <Image src={image} width={388} height={236} alt="" className="object-cover object-center h-auto" />
          ) : (
            ""
          )}
        </div>
        <div className="px-6 pt-4 pb-6">
          <BodyFont level="3" weight="medium" className="text-primary-900">
            {headLine}
          </BodyFont>
          <aside className="flex justify-between pt-2 text-grayscale-600">
            <BodyFont level="5" weight="medium">
              {timeAgo} ∙ {media}
            </BodyFont>
            <MoreButton />
          </aside>
        </div>
      </CardWrap>
    </>
  );
}
