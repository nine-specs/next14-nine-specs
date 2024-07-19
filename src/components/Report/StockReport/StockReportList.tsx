import BodyFont from "@/common/BodyFont";
import { uuid } from "uuidv4";
interface StockReportScores {
  subject: string;
  score: number;
  justification?: string;
}
interface Props {
  data?: StockReportScores[];
}

export default function StockReportList({ data }: Props) {
  const colorText = (score: number) =>
    score === 50 || score === 0
      ? "text-gray-500"
      : score > 50
      ? "text-red-600"
      : "text-sky-600";

  const iconText = (score: number) =>
    score === 50 || score === 0 ? "" : score > 50 ? "▲" : "▼";

  const formatNumber = (num: number) => {
    return num % 1 === 0 ? num : num.toFixed(1);
  };
  return (
    <div className="flex flex-col w-[168px] h-[168px] justify-center rounded-2xl bg-[#F9F9F9] py-3 px-4">
      {data &&
        data.map((item) => (
          <div
            className="flex gap-3 justify-between m-1"
            key={uuid()}
            title={item.justification}
          >
            <BodyFont level="4" weight="medium" className="overflow-hidden">
              {item.subject}
            </BodyFont>
            <div
              className={`${colorText(item.score)} w-[54px] flex justify-end`}
            >
              <BodyFont level="5" weight="medium" className="overflow-hidden">
                {iconText(item.score)}
                {formatNumber(item.score)}%
              </BodyFont>
            </div>
          </div>
        ))}
    </div>
  );
}
