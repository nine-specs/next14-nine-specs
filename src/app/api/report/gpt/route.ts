import { getGptReply } from "@/service/report/openAiReplyApi";

export async function POST(request: Request) {
  const { system, message } = await request.json();
  const data = await getGptReply(system, message);
  return new Response(JSON.stringify(data));
}
