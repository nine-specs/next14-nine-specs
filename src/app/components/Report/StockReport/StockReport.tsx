import BodyFont from "@/common/BodyFont";
import StockReportList from "./StockReportList";
import HeadingFont from "@/common/HeadingFont";
import dynamic from "next/dynamic";

const StockPolarChart = dynamic(() => import("./StockPolarChart"), {
  ssr: false, // Disable SSR for this component
  loading: () => null, // Component to render while loading
});
interface Props {
  chartData?: any;
  count?: number;
}
export default function StockReport({ chartData, count }: Props) {
  count = 70;
  const dataExam = [
    {
      subject: "주가",
      A: 120,
      B: 110,
      fullMark: 150,
    },

    {
      subject: "투자지수",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "수익성",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "성장성",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "관심도",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];
  return (
    <section className="space-y-6">
      <div className="flex justify-between ">
        <BodyFont level="1" weight="bold">
          종목 AI 리포트
        </BodyFont>
        <HeadingFont level="3" weight="medium" className="text-grayscale-700">
          {count}점
        </HeadingFont>
      </div>

      <div className="flex justify-between ">
        <StockPolarChart data={dataExam} />
        <StockReportList />
      </div>
    </section>
  );
}
