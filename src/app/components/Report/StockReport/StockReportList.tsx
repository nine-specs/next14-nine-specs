import BodyFont from "@/common/BodyFont";

interface Score {
  subject: string;
  score: number;
  justification: string;
}

interface Props {
  chartData?: Score[];
}

/**{
    subject: "주가",
    score: 85,
    justification:
      "주가는 지난 1년 동안 15% 상승하여 안정적이고 긍정적인 신호를 보여줍니다.",
  },
  {
    subject: "투자지수",
    score: 76,
    justification: "투자지수는 시장 평균보다 20% 높아 투자 매력이 매우 큽니다.",
  },
  {
    subject: "수익성",
    score: 92,
    justification:
      "수익성 지표는 업계 평균을 훨씬 웃돌아 강력한 재무 건전성을 나타냅니다.",
  },
  {
    subject: "성장성",
    score: 70,
    justification: "지난 해 매출이 18% 증가하여 견고한 성장세를 입증했습니다.",
  },
  {
    subject: "관심도",
    score: 72,
    justification:
      "미디어 언급이 지난 6개월 동안 15% 증가하여 지속적인 관심을 받고 있습니다.",
  }, */
/**
 *  주식 평가 리스트
 * @param {Props} { chartData} 주가 , 투자지수, 수익성, 성장성, 관심도 점수
 * @returns
 */
export default function StockReportList({ chartData }: Props) {
  return (
    <div className="flex flex-col w-[168px] h-[168px] justify-center rounded-2xl bg-[#F9F9F9] py-3 px-4">
      {chartData &&
        chartData.map((score, index) => (
          <div className="flex gap-3 justify-between m-1" key={index}>
            <BodyFont level="4" weight="medium">
              {score.subject}
            </BodyFont>
            <div
              className={`${
                score.score > 0 ? "text-red-600" : "text-sky-600"
              } w-[50px]`}
            >
              <BodyFont level="5" weight="medium">
                {score.score > 0 ? "▲" : "▼"}
                {Math.abs(score.score).toFixed(1)}%
              </BodyFont>
            </div>
          </div>
        ))}
    </div>
  );
}
