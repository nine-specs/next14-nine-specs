"use client";
import TextButton from "@/common/TextButton";
import { useCallback, useEffect, useState } from "react";
import { StockInfo } from "../type/report/stockType";

interface Props {
  stockInfo: StockInfo;
}
const getData = async (uid: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorStock?uid=${uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const updateData = async (uid: string, stockInfo: StockInfo) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorStock`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, stockInfo }),
    cache: "no-store",
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export default function StockFavorButton({ stockInfo }: Props) {
  const { name } = stockInfo;
  const [favor, setFavor] = useState(true);
  const [loading, setLoading] = useState(false);
  const uid = "test"; // 임시로 test로 설정

  const currentFavor = useCallback(
    (stocks: any) => {
      if (name in stocks) {
        setFavor(false);
      } else {
        setFavor(true);
      }
    },
    [name],
  );
  useEffect(() => {
    const fetchAndSetData = async () => {
      setLoading(true);
      try {
        const data = await getData(uid);
        currentFavor(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetData();
  }, [uid, name, currentFavor]); // `chageState` 추가

  const handleFavor = async () => {
    const data = await updateData(uid, stockInfo);
    currentFavor(data);
  };
  return (
    <div className="w-[180px]">
      <TextButton
        onClick={handleFavor}
        size="lg"
        className={`${
          !favor
            ? "bg-transparent text-primary-900 hover:border-primary-800 hover:text-primary-800 border-primary-900"
            : "bg-primary-900 hover:bg-primary-800 text-white border-primary-900"
        }`}
        disabled={loading}
      >
        {!favor ? "관심종목 해제" : "관심종목 추가"}
      </TextButton>
    </div>
  );
}
