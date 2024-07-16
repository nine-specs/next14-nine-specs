import Image from "next/image";
import Link from "next/link";

import BodyFont from "@/common/BodyFont";
import CardWrap from "@/common/CardWrap";

import SAMPLE_01 from "../../../../../public/images/news/NewsSample_01.png";

export default function PopularNewsItem({ index }: { index: number }) {
  return (
    <>
      <CardWrap
        width="100%"
        height="100%"
        padding={false}
        className="overflow-hidden relative before:absolute before:inset-x-0 before:bottom-0 before:h-1/2 before:bg-gradient-to-t before:from-[#3f3f3f]"
      >
        <Link href="">
          <div>
            <Image
              src={SAMPLE_01}
              alt=""
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 text-white p-6 z-20">
            <BodyFont level="1" weight="bold" className="mb-[14px]">
              엔비디아 또 신고가... 시총 2위 애플과 962억달러 차이
            </BodyFont>
            {index === 0 && (
              <BodyFont
                level="5"
                weight="medium"
                className="line-clamp-2 mb-[14px]"
              >
                엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔
                4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다.
                차세대 인공지능(AI) GPU 발표했다. 엔비디아가 기존 주식을 10주로
                쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시
                쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표했다.
                엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔
                4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다.
                차세대 인공지능(AI) GPU 발표했다.
              </BodyFont>
            )}
            <aside className="flex gap-2 before:content-['∙'] before:order-2">
              <BodyFont level="5" weight="medium" className="order-1">
                2024.06.05
              </BodyFont>
              <BodyFont level="5" weight="medium" className="order-3">
                문화일보
              </BodyFont>
            </aside>
          </div>
        </Link>
      </CardWrap>
    </>
  );
}
