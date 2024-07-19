import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  const response = await fetch(
    `https://polling.finance.naver.com/api/realtime/worldstock/stock/${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  const { closePrice, fluctuationsRatio, compareToPreviousClosePrice } =
    data.datas[0];

  return Response.json({
    closePrice,
    fluctuationsRatio,
    compareToPreviousClosePrice,
  });
}
