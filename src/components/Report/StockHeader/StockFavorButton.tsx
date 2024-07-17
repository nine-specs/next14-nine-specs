"use client";
import TextButton from "@/common/TextButton";
import React, { useState } from "react";
import { setTimeout } from "timers";
import { StockInfo } from "../type/report/stockType";

interface Props {
  stockInfo?: StockInfo;
}

export default function StockFavorButton({ stockInfo }: Props) {
  const [favor, setFavor] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendData = async ({
    uid,
    stockInfo,
  }: {
    uid: string;
    stockInfo?: StockInfo;
  }) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, stockInfo }),
    });
  };

  const fetchData = async (uid: string) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    });
  };
  const handleFavor = async () => {
    setLoading(true);
    setFavor((prev) => !prev);
    // API 호출
    const data: {
      uid: string;
      stockInfo?: StockInfo;
    } = {
      uid: "gU8dSD4pRUHr7xAx9cgL",
      stockInfo: stockInfo,
    };
    const res = await sendData(data);
    console.log(res);

    const res2 = await fetchData(data.uid);
    console.log("res2", res2);

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
