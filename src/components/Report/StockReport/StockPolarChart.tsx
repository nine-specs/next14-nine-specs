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

  PorlarAngle?: boolean;
  data?: any;
  viewAxis?: boolean;
}
export default function StockPolarChart({
 
  data,
  viewAxis,
}: Props) {
  const fullMark = 100;
  const dataKey = "subject";
  const valueKey = "score";
  const PorlarAngle = true;

  const outerRadius = (fullMark / 2) * 0.8; // 전체 크기의 80%를 사용
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart  cx="50%" cy="50%" data={data}>
        <PolarGrid stroke="#E9E9E9" strokeWidth={1} />
        {viewAxis && (
          <PolarAngleAxis tickSize={1} tick={PorlarAngle} dataKey={dataKey} />
        )}
        <Radar
          name="AiReport"
          dataKey={valueKey}
          stroke="#00ACF2"
          fill="#B2E6FA"
          fillOpacity={0.6}
        />
        <Radar dataKey="fullMark" fillOpacity={0} stroke="#9F9F9F" />
      </RadarChart>
    </ResponsiveContainer>
  );
}
