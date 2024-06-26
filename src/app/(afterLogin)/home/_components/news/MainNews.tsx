import Image from "next/image";
import SubTitle from "../../_ui/SubTitle";

import MOCKUP_IMG from "../../../../../../public/images/main/background_img.png";
import BodyFont from "@/common/BodyFont";

/**
 * 주요 뉴스
 */
export default function MainNews() {
  return (
    <>
      <div>
        <SubTitle subTitle="주요 뉴스" />
        <article className="p-12 border border-primary-100 rounded-2xl flex gap-5">
          <div className="rounded-3xl overflow-hidden w-[338px] h-[240px]">
            <Image src={MOCKUP_IMG} alt="" width={338} height={240} />
          </div>
          <div className="flex-1">
            <BodyFont level="1" weight="medium">
              올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"
            </BodyFont>
            <hr className="my-6 border-none h-[1px] bg-gray-400" />
            <BodyFont
              level="3"
              weight="regular"
              className="line-clamp-5 text-[#464646]"
            >
              자연재해 위험을 채권 형태로 자본시장에 전가하는 이른바 '대(大)재해
              채권' 발행이 올해 기록적 수준으로 늘어난 것으로 전해졌다.
              <br />
              블룸버그통신은 9일(현지시간) 보험연계증권(ILS) 정보 집계업체인
              아르테미스를 인용해 올해 1~5월 대재해 채권 판매액이 기존
              최고치였던 전년 동기 대비보다도 38% 늘어난 상태라고 전했다. 또
              대재해 채권은 지난달에만 40억 달러(약 5조5천억원)가량 발행돼 월간
              기준 최고치를 갈아치웠다는 것이다.자연재해 위험을 채권 형태로
              자본시장에 전가하는 이른바 '대(大)재해 채권' 발행이 올해 기록적
              수준으로 늘어난 것으로 전해졌다.블룸버그통신은 9일(현지시간)
              보험연계증권(ILS) 정보 집계업체인 아르테미스를 인용해 올해 1~5월
              대재해 채권 판매액이 기존 최고치였던 전년 동기 대비보다도 38%
              늘어난 상태라고 전했다.
            </BodyFont>
          </div>
        </article>
      </div>
    </>
  );
}
