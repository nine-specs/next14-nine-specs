"use client";

import BodyFont from "@/common/BodyFont";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import PeriodRadioButton from "./PeriodRadioButton";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // UTC 플러그인
import timezone from "dayjs/plugin/timezone"; // 시간대(timezone) 플러그인
import { StockPrice } from "@/service/report/stockPriceApi";
dayjs.extend(utc); // UTC 플러그인 적용
dayjs.extend(timezone); // 시간대(timezone) 플러그인 적용

interface Porps {
  yearData: StockPrice[];
  dayData: StockPrice[];
}

type Period = "1일" | "3개월" | "1년" | "3년" | "10년";
/**
 * 계산 함수
 * 주식 차트 데이터를 기간에 따라 필터링합니다.
 * @param {string} today
 * @param {Period} period
 * @param {StockPrice[]} data
 * @returns
 */
const filterData = (
  today: string = "20240501",
  period: Period = "1일",
  data: StockPrice[],
): StockPrice[] => {
  console.log("필터 함수 실행");
  const end = dayjs(today, "YYYYMMDD");
  let start;

  const getFilteredData = (
    data: StockPrice[],
    start: string | dayjs.Dayjs,
    end: string | dayjs.Dayjs,
  ) => {
    return data.filter((d) => {
      const date = dayjs(d.localDate, "YYYYMMDD");
      return date.isAfter(start) && date.isBefore(end);
    });
  };

  switch (period) {
    case "1일":
      start = end.subtract(1, "month");
      break;
    case "3개월":
      start = end.subtract(3, "month");
      break;
    case "1년":
      start = end.subtract(1, "year");
      break;
    case "3년":
      start = end.subtract(3, "years");
      break;
    case "10년":
      start = end.subtract(10, "years");
      break;
    default:
      throw new Error("Unsupported period");
  }
  return getFilteredData(data, start, end);
};
/**
 * 데이터 함수 tradingReferenceDate : 거래 참조 날짜
 * 주식은 미국 동부 시간 기준으로 제공되므로, 현재 시간을 미국 동부 시간으로 설정합니다.
 * 개장 시간이 아닌 경우 전일 데이터를 사용합니다. **/
const tradingReferenceDate = (): string => {
  // 미국 동부 시간대에서 현재 시간을 구합니다.
  const now = dayjs().tz("America/New_York");
  // 개장 시간 설정 (동부 시간 기준 오전 9시 30분)
  const openingTime = dayjs()
    .tz("America/New_York")
    .hour(9)
    .minute(30)
    .second(0);

  // 현재 시간이 개장 시간 이전인지 확인
  if (now.isBefore(openingTime)) {
    // 개장 전이므로 전일 데이터를 사용
    return now.subtract(1, "day").format("YYYYMMDD");
  } else {
    // 개장 후이므로 오늘 날짜를 사용
    return now.format("YYYYMMDD");
  }
};
export default function StockAreaChart({ yearData, dayData }: Porps) {
  const marketDate = tradingReferenceDate();
  const [selectedValue, setSelectedValue] = useState<Period>("1일"); // 선택된 기간

  const [allData] = useState(() => {
    const initialData = {
      "1일": filterData(marketDate, "1일", dayData),
      "3개월": filterData(marketDate, "3개월", dayData),
      "1년": filterData(marketDate, "1년", dayData),
      "3년": filterData(marketDate, "3년", yearData),
      "10년": filterData(marketDate, "10년", yearData),
    };
    return initialData;
  });

  const [chartData, setChartData] = useState<StockPrice[]>(allData["1일"]); // 차트 데이터

  // 액션 함수
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const period = event.target.value as Period;
    setSelectedValue(period); // 선택된 기간 변경
    setChartData(allData[period]); // 차트 데이터 변경
  };

  return (
    <div className="flex justify-between h-full">
      <div className="flex flex-col  justify-between ">
        {/* 타이틀 */}
        <BodyFont level="1" weight="bold">
          주가 차트
        </BodyFont>

        {/* area 차트 */}
        <AreaChart width={556} height={136} data={chartData}>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="closePrice"
            stroke="#47B4E1"
            fill="rgba(71, 180, 225, 0.1)"
          />
        </AreaChart>
      </div>

      {/* 기간 선택 라디오 버튼  */}
      <PeriodRadioButton
        selectedValue={selectedValue}
        handleChange={handleChange}
      />
    </div>
  );
}
