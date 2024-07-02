"use client";
import TextButton from "@/common/TextButton";
import React, { useState } from "react";
import { setTimeout } from "timers";

interface Props {
  title?: string;
}

/**
 * 관심종목 추가 버튼
 * @param {string} title - 버튼 텍스트
 */
export default function StockFavorButton({ title }: Props) {
  const [favor, setFavor] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFavor = () => {
    setLoading(true);
    setFavor((prev) => !prev);
    // API 호출
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="w-[180px]">
      <TextButton
        onClick={handleFavor}
        variant={`${favor ? "outline" : "primary"}`}
        size="lg"
        disabled={loading}
      >
        {favor ? "관심종목 추가" : "관심종목 해제"}
      </TextButton>
    </div>
  );
}
