import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  title?: string;
}
/**
 * 주식 아이콘
 * @param {string} string   - 이미지 너비
 * @param {number} width   - 이미지 너비
 * @param {number} height  - 이미지 높이
 * @returns
 */
export default function StockLogoImage({
  title = "TSLA.O",
  width = 32,
  height = 32,
}: Props) {
  return (
    <Image
      src={`https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${title}.svg`}
      alt="stock"
      width={width}
      height={height}
    />
  );
}
