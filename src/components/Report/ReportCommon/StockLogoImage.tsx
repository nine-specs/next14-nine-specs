"use client";
import Image from "next/image";
import { useState } from "react";

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
  const [error, setError] = useState(true);
  return (
    <Image
      src={
        error
          ? `https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock${code}.svg`
          : `/images/Not_found_icon.svg`
      }
      alt="stock"
      width={width}
      height={height}
      onError={() => setError(false)}
    />
  );
}
