import AI_ICON from "../../../../../public/images/AI_icon.svg";
import Badge from "@/common/Badge";

import Title from "../_ui/Title";
import { StockInfo } from "@/components/Report/type/report/stockType";
import { AiCarousel } from "../_ui/AiCarousel";
import { BASE_URL } from "@/constants";

/**
 * 유저의 AI 리포트
 */
export default async function AiReport({ userName, userId }: { userName: string; userId: string }) {
  const userStocks: StockInfo[] = await (
    await fetch(`${BASE_URL}/api/my/stocks`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    })
  ).json();

  return (
    <>
      <div>
        <div className="flex gap-4 items-start">
          <Title title={`${userName}님의 AI 리포트`} />
          <Badge text="AI" className="mb-6">
            <AI_ICON width="20" height="20" />
          </Badge>
        </div>

        <AiCarousel stocks={userStocks} />
      </div>
    </>
  );
}
