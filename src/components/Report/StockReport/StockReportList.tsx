import BodyFont from "@/common/BodyFont";
import { uuid } from "uuidv4";
interface StockReportScores {
  subject: string;
  score: number;
}
interface Props {
  data?: StockReportScores[];
}

export default function StockReportList({ data }: Props) {
  return (
    <div className="flex flex-col w-[168px] h-[168px] justify-center rounded-2xl bg-[#F9F9F9] py-3 px-4">
      {data &&
        data.map((score) => (
          <div className="flex gap-3 justify-between m-1" key={uuid()}>
            <BodyFont level="4" weight="medium" className="overflow-hidden">
              {score.subject}
            </BodyFont>
            <div
              className={`${
                score.score > 0 ? "text-red-600" : "text-sky-600"
              } w-[54px]`}
            >
              <BodyFont level="5" weight="medium" className="overflow-hidden">
                {score.score > 0 ? "▲" : "▼"}
                {Math.abs(score.score).toFixed(1)}%
              </BodyFont>
            </div>
          </div>
        ))}
    </div>
  );
}
