import AI_ICON from "../../../../../public/images/AI_icon.svg";
import Badge from "@/common/Badge";

import Title from "../_ui/Title";
import { StockInfo } from "@/components/Report/type/report/stockType";
import { AiCarousel } from "../_ui/AiCarousel";

/**
 * 유저의 AI 리포트
 */
export default function AiReport({ name, stocks }: { name: string; stocks: StockInfo[] }) {
  return (
    <>
      <div>
        <div className="flex gap-4 items-start">
          <Title title={`${name}님의 AI 리포트`} />
          <Badge text="AI" className="mb-6">
            <AI_ICON width="20" height="20" />
          </Badge>
        </div>

        <AiCarousel stocks={stocks} />
      </div>
    </>
  );
}
