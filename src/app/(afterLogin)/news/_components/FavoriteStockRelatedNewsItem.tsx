import Image from "next/image";

import BodyFont from "@/common/BodyFont";
import CardWrap from "@/common/CardWrap";
import MoreButton from "../_ui/MoreButton";

import SAMPLE_03 from "../../../../../public/images/news/NewsSample_03.png";

export default function FavoriteStockRelatedNewsItem() {
  return (
    <>
      <CardWrap className="overflow-hidden" width="100%" height="420" padding={false}>
        <div className="w-auto h-[230px] overflow-hidden">
          <Image src={SAMPLE_03} alt="" className="object-cover object-center" />
        </div>
        <div className="px-6 pt-4 pb-6">
          <BodyFont level="3" weight="medium" className="text-primary-900">
            올해 자연재해 채권 발행액↑…美 등 허리케인 피해 크면 손실
          </BodyFont>
          <aside className="flex justify-between pt-2 text-grayscale-600">
            <BodyFont level="5" weight="medium">
              n시간 전 ∙ 문화일보
            </BodyFont>
            <MoreButton />
          </aside>
        </div>
      </CardWrap>
    </>
  );
}
