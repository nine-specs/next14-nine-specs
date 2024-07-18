import BodyFont from "@/common/BodyFont";

interface StockReportScores {
  subject: string;
  score: number;
}

export default function StockReport({ data }: { data: StockReportScores[] }) {
  return (
    <ul className="flex flex-col justify-center items-center gap-1 rounded-3xl bg-[#f9f9f9] py-4">
      {data.map((score, index) => {
        const isUp = score.score > 0;
        return (
          <li
            className="flex justify-between w-[120px] items-center"
            key={index}
          >
            <BodyFont level="4" weight="medium" className="text-grayscale-600">
              {score.subject}
            </BodyFont>

            <BodyFont
              level="5"
              weight="medium"
              className={isUp ? "text-warning" : "text-secondary-600"}
            >
              {isUp ? "▲" : "▼"}
              {Math.abs(score.score).toFixed(1)}%
            </BodyFont>
          </li>
        );
      })}
    </ul>
  );
}
