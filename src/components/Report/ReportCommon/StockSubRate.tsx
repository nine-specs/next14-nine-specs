import BodyFont from "@/common/BodyFont";

type width = "medium" | "bold" | "regular";
type level = "1" | "2" | "3" | "4" | "5";

interface Props {
  fluctuation: string | number;
  changeRate: string | number;
  weight?: width;
  level?: level;
}
export default function StockSubRate({
  fluctuation,
  changeRate,
  weight = "medium" as width,
  level = "2" as level,
}: Props) {
  fluctuation = Number(fluctuation);
  changeRate = Number(changeRate);

  const fluctuationStyle =
    fluctuation > 0 ? " text-warning" : "text-secondary-600";
  const changeRateStyle =
    changeRate > 0 ? " text-warning" : "text-secondary-600";

  return (
    <>
      <BodyFont level={level} weight={weight} className={fluctuationStyle}>
        {fluctuation > 0 ? "▲" : "▼"}
        {Math.abs(fluctuation).toFixed(2)}%
      </BodyFont>
      <BodyFont level={level} weight={weight} className={changeRateStyle}>
        {changeRate > 0 ? "+" + changeRate : changeRate}
      </BodyFont>
    </>
  );
}
