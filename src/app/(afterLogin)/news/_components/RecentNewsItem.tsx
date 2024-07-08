import Link from "next/link";
import Image from "next/image";

import Heading from "../_ui/Heading";
import BodyFont from "@/common/BodyFont";

import SAMPLE_04 from "../../../../../public/images/news/NewsSample_04.png";

export default function RecentNewsItem() {
  return (
    <>
      <div className="rounded-2xl w-[252px] h-[114px] overflow-hidden">
        <Image
          src={SAMPLE_04}
          alt=""
          width={252}
          height={148}
          className="object-cover object-center"
        />
      </div>
      <div className="flex-1">
        <Link href="">
          <div className="mb-4 flex justify-between items-center">
            <Heading
              heading={`"산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨`}
            />
            <aside className="text-grayscale-600">
              <BodyFont level="5" weight="medium">
                n시간 전 ∙ 문화일보
              </BodyFont>
            </aside>
          </div>
          <BodyFont
            level="4"
            weight="regular"
            className="text-grayscale-900 line-clamp-4"
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
        </Link>
      </div>
    </>
  );
}
