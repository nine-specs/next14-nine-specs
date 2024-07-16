import BodyFont from "@/common/BodyFont";

type width = "medium" | "bold" | "regular";
type level = "1" | "2" | "3" | "4" | "5";

interface Props {
  fluctuation: string | number;
  changeRate: string | number;
  weight?: width;
  level?: level;
  className?: string;
}
export default function StockSubRate({
  fluctuation,
  changeRate,
  weight = "medium" as width,
  level = "2" as level,
  className,
}: Props) {
  fluctuation = Number(fluctuation);
  changeRate = Number(changeRate);

  const colorStyle =
    fluctuation === 0
      ? ""
      : fluctuation > 0
      ? " text-warning"
      : "text-secondary-600";

  return (
    <div className={`flex ${className}`}>
      <BodyFont level={level} weight={weight} className={colorStyle}>
        {fluctuation === 0 ? "" : fluctuation > 0 ? "▲" : "▼"}
        {Math.abs(fluctuation).toFixed(2)}%
      </BodyFont>
      <BodyFont level={level} weight={weight} className={colorStyle}>
        {changeRate >= 0 ? "+" + changeRate : changeRate}
      </BodyFont>
    </div>
  );
}
