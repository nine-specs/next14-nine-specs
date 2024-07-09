import Image from "next/image";
import SubTitle from "../../_ui/SubTitle";

import MOCKUP_IMG from "../../../../../../public/images/main/background_img.png";
import BodyFont from "@/common/BodyFont";
import Link from "next/link";

/**
 * 최신 뉴스
 */
export default function RecentlyNews() {
  return (
    <>
      <div>
        <SubTitle subTitle="최신 뉴스" />
        <ul className="p-12 border border-primary-100 rounded-2xl">
          {Array.from({ length: 4 }, (_, index) => (
            <li
              className="border-b border-gray-400 pb-8 pt-8 first:pt-0 last:border-none last:pb-0"
              key={index}
            >
              <NewsItem />
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
const NewsItem = () => {
  return (
    <Link href={""}>
      <article className="flex gap-5">
        <div className="rounded-2xl overflow-hidden w-[172px] h-[100px]">
          <Image src={MOCKUP_IMG} alt="" width={172} height={100} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <BodyFont level="3" weight="bold" className="text-grayscale-900">
              "산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨
            </BodyFont>
            <BodyFont level="5" weight="medium" className="text-grayscale-600">
              n시간전 ∙ 문화일보
            </BodyFont>
          </div>
          <BodyFont
            level="4"
            weight="regular"
            className="line-clamp-2 text-grayscale-900"
          >
            윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스 매장
            가능성이 있다"고 발표하면서 석유주가 이틀째 급등했다.3일
            한국석유(004090)는 전일대비 5350원(29.81%) 오른 2만3300원에 거래를
            마쳤다. 한국석유는 전날에도 상한가로 장을 마친 바 있다.이 외에도
            한국ANKOR유전도 상한가를 찍었고, 흥구석유(024060)는 18.40%
            올랐다.윤석열 대통령은 전날 용산 대통령실에서 열린 국정 브리핑에서
            "포항 영일만 앞바다에 막대한 양의 석유와 가스가 매장돼 있을 가능성이
            높다는 물리탐사 결과가 나왔다"고 밝혔다.매장량은 최대 140억 배럴
            가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할 양이라고
            설명했다.
          </BodyFont>
        </div>
      </article>
    </Link>
  );
};
