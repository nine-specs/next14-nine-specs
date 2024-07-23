import { StockInfo } from "@/components/Report/type/report/stockType";
import StockList from "../_ui/StockList";
import { BASE_URL } from "@/constants";

export default async function FavoriteStocks({ userId }: { userId: string }) {
  const userStocks: StockInfo[] = await (
    await fetch(`${BASE_URL}/api/my/stocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
  ).json();

  return (
    <>
      <StockList stocks={userStocks} title="관심 종목" />
    </>
  );
}
