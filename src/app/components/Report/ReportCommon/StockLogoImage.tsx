import Image from "next/image";

interface Props {
  width: number;
  height: number;
  code: string;
}
/**
 * 주식 아이콘
 * @param {string} code   - 주식 코드
 * @param {number} width   - 이미지 너비
 * @param {number} height  - 이미지 높이
 * @returns
 */
export default function StockLogoImage({
  code = "TSLA.O",
  width = 32,
  height = 32,
}: Props) {
  return (
    <Image
      src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${code}.svg`}
      alt="stock"
      width={width}
      height={height}
    />
  );
}
