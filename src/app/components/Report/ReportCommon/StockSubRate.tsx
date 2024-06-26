import BodyFont from "@/common/BodyFont";

type width = "medium" | "bold" | "regular";
type level = "1" | "2" | "3" | "4" | "5";
interface Props {
  fluctuation?: number;
  changeRate?: number;
  weight?: width;
  level?: level;
}

/**
 * 주식 등락률 컴포넌트
 * @param {number} fluctuation - 등락률
 * @param {number} changeRate - 변화율
 * @param {width} weight - 폰트 굵기
 * @param {level} level - 폰트 크기
 * @returns
 */
export default function StockSubRate({
  fluctuation = 1,
  changeRate = -1,
  weight = "medium" as width,
  level = "2" as level,
}) {
  const fluctuationStyle =
    fluctuation > 0 ? " text-warning" : "text-secondary-600";
  const changeRateStyle =
    changeRate > 0 ? " text-warning" : "text-secondary-600";

  return (
    <>
      <BodyFont level={level} weight={weight} className={fluctuationStyle}>
        {fluctuation > 0 ? "▲" : "▼"}
        {Math.abs(fluctuation).toFixed(1)}%
      </BodyFont>
      <BodyFont level={level} weight={weight} className={changeRateStyle}>
        {changeRate > 0 ? "+" + changeRate : changeRate}%
      </BodyFont>
    </>
  );
}
