"use client";

import { useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import PeriodRadioButton from "./PeriodRadioButton";
import { StockPrice } from "../type/stockType";

// 기간 타입
type Period = "1일" | "3개월" | "1년" | "3년" | "10년";

interface Props {
  allData: {
    "1일": StockPrice[];
    "3개월": StockPrice[];
    "1년": StockPrice[];
    "3년": StockPrice[];
    "10년": StockPrice[];
  };
}

/**
 * 주식 area 차트 컴포넌트
 * @param {object} allData - 차트 데이터 (1일, 3개월, 1년, 3년, 10년)
 * @returns
 */
export default function StockAreaChart({ allData }: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("1일");
  const [selectedChartData, setSelectedChartData] = useState<StockPrice[]>(
    allData["1일"],
  );

  // 기간 변경 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period = event.target.value as Period;
    const data = allData[period];
    setSelectedPeriod(period); // 선택된 기간 변경
    setSelectedChartData(data); // 차트 데이터 변경
  };

  return (
    <div className=" flex justify-between">
      {/* area 차트 */}
      <div className="flex flex-col justify-end">
        <AreaChart width={556} height={136} data={selectedChartData}>
          <Tooltip />

          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#47B4E1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#47B4E1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="closePrice"
            stroke="#47B4E1"
            fill="url(#colorPv)"
          />
          <XAxis
            dataKey="date"
            axisType="xAxis"
            axisLine={false}
            tickMargin={10}
            minTickGap={10}
            interval={"preserveStartEnd"}
            tick={{ fill: "#9F9F9F", fontSize: 12 }}
          />
          <YAxis hide={true} scale="log" domain={["auto", "auto"]} />
        </AreaChart>
      </div>
      {/* 기간 선택 라디오 버튼  */}
      <PeriodRadioButton
        selectedPeriod={selectedPeriod}
        handleChange={handleChange}
      />
    </div>
  );
}
