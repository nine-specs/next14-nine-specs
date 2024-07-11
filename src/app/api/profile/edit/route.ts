import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // 쿼리 스트링 파라미터 받아오기
  const url = new URL(request.url);
  const nick = url.searchParams.get("nick");
  const previousNick = url.searchParams.get("previousNick");
  const myStock = url.searchParams.get("myStock");

  // 요청 본문에서 데이터 읽기
  const body = await request.json();

  console.log("쿼리 스트링 파라미터:", { nick, previousNick, myStock });
  console.log("요청 본문 데이터:", body);

  return new Response(JSON.stringify({ res: "응답함", data: body }), {
    headers: { "Content-Type": "application/json" },
  });
}
