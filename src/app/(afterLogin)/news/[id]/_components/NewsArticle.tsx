import Image from "next/image";
import { redirect } from "next/navigation";

import HeadingFont from "@/common/HeadingFont";
import ListWrap from "@/common/ListWrap";
import TextButton from "@/common/TextButton";
import IconButton from "@/common/IconButton";

import TranslateIcon from "../../../../../../public/images/Translate_icon.svg";
import AiIcon from "../../../../../../public/images/logo/LOGO.svg";
import SAMPLE_05 from "../../../../../../public/images/news/NewsSample_05.png";

type NewsArticleProps = {
  params: {
    id: string;
  };
};

export default function NewsArticle({ params }: NewsArticleProps) {
  const id = parseInt(params.id);

  if (Number.isNaN(id)) {
    redirect("/not-found");
  }

  return (
    <>
      <ListWrap width="792px" height="auto" padding="md">
        <HeadingFont level="4" weight="bold">
          삼성·TSMC 중국 접근 막을 수도 美 새 반도체 제한 전망
        </HeadingFont>
        <div className="flex justify-between mt-4">
          <aside className="flex gap-[6px] before:content-['∙'] before:order-2">
            <span className="text-[14px] text-grayscale-600 font-medium order-1">한국경제</span>
            <span className="text-[14px] text-grayscale-600 font-medium order-3">2024년 6월 5일 오전 11:23</span>
          </aside>
          <div className="w-[176px]">
            <TextButton variant="primary" size="sm">
              <TranslateIcon fill="#fff" className="inline-block mr-[2px]" />
              번역하기
            </TextButton>
          </div>
        </div>
        <section className="my-8">
          <div className="flex gap-3 mb-6">
            <IconButton color="primary" size="xs" round="md">
              <AiIcon width="14" height="14" />
            </IconButton>
            <h5 className="text-4 font-semibold">아잇나우 AI요약</h5>
          </div>
          <p>
            바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성 바이오 연구의 첨단,인공 유전자로 인간 피부 재생
            가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
            가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
            가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
            가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성
          </p>
        </section>
        <article>
          <div className="rounded-[10px] overflow-hidden mb-6">
            <Image src={SAMPLE_05} alt="" />
          </div>
          <div className="leading-[26px] flex flex-col gap-4">
            <p>
              트웰브랩스는 지난해 10월 한국 스타트업으로는 처음으로 엔비디아의 투자를 받아 주목받았던 회사다. 당시 총
              투자유치액은 1000만달러였다. 이번 투자엔 지난해 투자에 참여했던 투자사들이 연이어 참여했다.
              뉴엔터프라이즈어소시에이트(NEA)와 엔비디아의 자회사인 엔벤쳐스가 리드 투자자로 나섰고, 인덱스벤쳐스,
              래디컬벤쳐스, 원더코벤처스 등 글로벌 투자사들이 참여했다. 국내에서는 한국투자파트너스가 참여했다. 이로써
              트웰브랩스의 누적 투자 금액은 7700만 달러(약 1060억원) 수준이다.
            </p>
            <p>
              엔벤쳐스 대표인 모하메드 시딕 엔비디아 부사장은 “트웰브랩스의 뛰어난 영상이해 기술과 엔비디아의 가속
              컴퓨팅을 바탕으로 다양한 연구 협업을 할 예정”이라고 말했다. 한국투자파트너스의 김민준 팀장은 “LLM 시장은
              오픈AI를 비롯한 빅테크 중심으로 소위 ‘그들만의 리그’가 형성돼 있지만, 멀티모달 영상이해AI 시장에서만큼은
              트웰브랩스가 글로벌 선도 기업이 될 수 있다고 판단했다고 투자 배경을 설명했다.
            </p>
            <p>
              트웰브랩스는 엔비디아와 협력해 기존 언어모델에 특화된 텐서RT-LLM의 성능 개선 작업을 진행 중이다. 멀티모달
              영상이해 분야를 선점하는 게 목표다. 지난 3월 출시한 초거대 AI 영상 언어 생성 모델 페가수스와 멀티모달
              영상이해 모델 ‘마렝고’는 구글, 오픈AI 등 상용 및 오픈소스 영상 언어 모델과 비교해 최대 43% 가량이 성능이
              높다는 결과를 내기도 했다.
            </p>
          </div>
        </article>
      </ListWrap>
    </>
  );
}
