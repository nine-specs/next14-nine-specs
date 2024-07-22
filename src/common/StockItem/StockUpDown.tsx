import BodyFont from "@/common/BodyFont";

export default function StockUpDown({
  size,
  fluctuation,
  changeRate,
}: {
  size: "4" | "5";
  fluctuation: string;
  changeRate: string;
}) {
  const isUp = Number(fluctuation) > 0 && Number(changeRate) >= 0;
  const noChange = Number(fluctuation) === 0;

  return (
    <>
      <BodyFont
        level={size}
        weight="regular"
        className={`flex gap-2 ${noChange ? "" : isUp ? "text-warning" : "text-secondary-600"}`}
      >
        <span>
          {noChange ? "" : isUp ? "▲" : "▼"}
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
