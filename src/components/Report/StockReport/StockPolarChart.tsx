"use client";

import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { StockReportScore } from "../type/report/stockType";
interface Props {
  PorlarAngle?: boolean;
  data: StockReportScore[];
  viewAxis?: boolean;
  dataKey?: string;
  valueKey?: string;
  cx?: string;
  cy?: string;
}

export default function StockPolarChart({
  dataKey = "subject",
  valueKey = "score",
  PorlarAngle = true,
  data,
  cx = "50%",
  cy = "50%",
  viewAxis,
}: Props) {
  const outerRadius = PorlarAngle ? "80%" : "100%";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx={cx} cy={cy} data={data} outerRadius={outerRadius}>
        <PolarGrid stroke="#E9E9E9" strokeWidth={1} />
        {viewAxis && (
          <PolarAngleAxis
            tickSize={2}
            style={{ fontSize: "12px" }}
            tick={PorlarAngle}
            dataKey={dataKey}
          />
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
