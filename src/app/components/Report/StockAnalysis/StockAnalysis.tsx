"use client";

import BodyFont from "@/common/BodyFont";
import React, { useEffect, useState } from "react";
import StockLogoImage from "../ReportCommon/StockLogoImage";
import StockSubRate from "../ReportCommon/StockSubRate";

interface Props {
  title?: string;
  ticker?: string;
  price?: number;
  fluctuation?: number;
  changeRate?: number;
  content?: string;
}
/**
 *
 */
export default function StockAnalysis() {
  const header = "아잇나우 AI 애널리스트 리포트";
  const title = "애플";
  const ticker = "AAPL";
  const price = 10000;
  const fluctuation = -0.5;
  const changeRate = -0.5;
  const content =
    "급격한 금리 인상에도 견조한 자동차 수요를 반영하여 테슬라의 목표주가를 340달러로 26% 상향 조정하고 Top Pick으로 유지한다. 단기 상승에 따른 숨 고르기가 예상되지만, 중기적으로 동사의 경쟁우위는 더 강해지고 있다. 기존 OEM의 전기차 전환이 더디고 중국 신생 업체들의 현금 흐름이 약화되고있는 가운데, 테슬라의 멕시코 공장이 가동되면 전기차 제조 경쟁력 격차는 더 벌어질 것으로 예상된다.";

  return (
    <section className="flex flex-col gap-14">
      <BodyFont level="1" weight="bold">
        {header}
      </BodyFont>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 ">
            <StockLogoImage width={32} height={32} />
            <div className="flex gap-1">
              <BodyFont level="3" weight="medium">
                {title}
              </BodyFont>
              <BodyFont level="3" weight="regular">
                ∙
              </BodyFont>
              <BodyFont level="3" weight="medium">
                {ticker}
              </BodyFont>{" "}
            </div>
          </div>
          <div className="flex p-0.5 items-center gap-0.5">
            <BodyFont level="4" weight="medium">
              {`₩${price}`}
            </BodyFont>
          </div>
          <div className="flex gap-2">
            <StockSubRate
              fluctuation={fluctuation}
              changeRate={changeRate}
              weight="regular"
              level="4"
            />
          </div>
        </div>
        <BodyFont level="4" weight="medium">
          {content}
        </BodyFont>
      </div>
    </section>
  );
}
