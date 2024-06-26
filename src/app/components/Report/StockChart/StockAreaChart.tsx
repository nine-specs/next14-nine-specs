"use client";

import BodyFont from "@/common/BodyFont";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import PeriodRadioButton from "./PeriodRadioButton";

interface StockAreaChartProps {
  data?: any;
}

export default function StockAreaChart({ data }: StockAreaChartProps) {
  data = [
    {
      localDate: "20240501",
      closePrice: 100.1,
    },
    {
      localDate: "20240501",
      closePrice: 101.2,
    },
    {
      localDate: "20240501",
      closePrice: 102.3,
    },
    {
      localDate: "20240501",
      closePrice: 103.4,
    },
    {
      localDate: "20240501",
      closePrice: 104.5,
    },
    {
      localDate: "20240501",
      closePrice: 105.6,
    },
    {
      localDate: "20240501",
      closePrice: 106.7,
    },
    {
      localDate: "20240501",
      closePrice: 107.8,
    },
    {
      localDate: "20240501",
      closePrice: 108.9,
    },
    {
      localDate: "20240501",
      closePrice: 110.0,
    },
    {
      localDate: "20240504",
      closePrice: 111.1,
    },
    {
      localDate: "20240504",
      closePrice: 112.2,
    },
    {
      localDate: "20240504",
      closePrice: 113.3,
    },
    {
      localDate: "20240504",
      closePrice: 114.4,
    },
    {
      localDate: "20240504",
      closePrice: 115.5,
    },
    {
      localDate: "20240504",
      closePrice: 116.6,
    },
    {
      localDate: "20240504",
      closePrice: 117.7,
    },
    {
      localDate: "20240504",
      closePrice: 118.8,
    },
    {
      localDate: "20240504",
      closePrice: 119.9,
    },
    {
      localDate: "20240504",
      closePrice: 121.0,
    },
    {
      localDate: "20240507",
      closePrice: 122.1,
    },
    {
      localDate: "20240507",
      closePrice: 123.2,
    },
    {
      localDate: "20240507",
      closePrice: 124.3,
    },
    {
      localDate: "20240507",
      closePrice: 125.4,
    },
    {
      localDate: "20240507",
      closePrice: 126.5,
    },
    {
      localDate: "20240507",
      closePrice: 127.6,
    },
    {
      localDate: "20240507",
      closePrice: 128.7,
    },
    {
      localDate: "20240507",
      closePrice: 129.8,
    },
    {
      localDate: "20240507",
      closePrice: 130.9,
    },
    {
      localDate: "20240507",
      closePrice: 132.0,
    },
  ];
  const [selectedValue, setSelectedValue] = useState<string>("1일");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
  };

  const midIndex = Math.floor(data.length / 2);
  return (
    <div className="flex justify-between h-full">
      {/* Area 차트  */}
      <div className="flex flex-col  justify-between ">
        <BodyFont level="1" weight="bold">
          주가 차트
        </BodyFont>
        <ResponsiveContainer width={556} height={136}>
          <AreaChart width={556} height={136} data={data}>
            {/* 수정 되어야 함 */}
            <XAxis minTickGap={10} stroke="" dataKey="localDate" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="closePrice"
              stroke="#47B4E1"
              fill="rgba(71, 180, 225, 0.1)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 기간 선택 라디오 버튼  */}
      <PeriodRadioButton
        selectedValue={selectedValue}
        handleChange={handleChange}
      />
    </div>
  );
}
