"use client";

import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface Props {
  width?: number;
  height?: number;
  PorlarAngle?: boolean;
  data?: any;
}
export default function StockPolarChart({ data }: Props) {
  const { fullMark } = data[0];

  const width = 175;
  const height = 175;
  const dataKey = "subject";
  const valueKey = "A";
  const PorlarAngle = true;

  const outerRadius = (fullMark / 2) * 0.8; // 전체 크기의 80%를 사용
  return (
    <RadarChart
      width={175}
      height={175}
      cx="50%"
      cy="50%"
      outerRadius={outerRadius}
      data={data}
    >
      <PolarGrid stroke="#E9E9E9" strokeWidth={1} outerRadius={3} />
      <PolarAngleAxis tickSize={1} tick={PorlarAngle} dataKey={dataKey} />
      <Radar
        name="AiReport"
        dataKey={valueKey}
        stroke="#00ACF2"
        fill="#B2E6FA"
        fillOpacity={0.6}
      />
      <Radar dataKey="fullMark" fillOpacity={0} stroke="#9F9F9F" />
    </RadarChart>
  );
}
