import BodyFont from "@/common/BodyFont";

export default function StockUpDown({
  fluctuation,
  changeRate,
}: {
  fluctuation: string;
  changeRate: string;
}) {
  const isUp = Number(fluctuation) > 0 && Number(changeRate) > 0;

  return (
    <>
      <BodyFont
        level="4"
        weight="regular"
        className={`flex gap-2 ${isUp ? "text-warning" : "text-secondary-600"}`}
      >
        <span>
          {isUp ? "▲" : "▼"}
          {Math.abs(Number(fluctuation)).toFixed(2)}%
        </span>
        <span>
          {isUp && "+"}
          {changeRate}
        </span>
      </BodyFont>
    </>
  );
}
