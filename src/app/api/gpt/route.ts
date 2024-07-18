import { getGptReply } from "@/service/ai/openAiReplyApi";

export async function POST(request: Request) {
  const { system, message, stream = false } = await request.json();

  const response = await getGptReply(system, message, stream);
  const data = response.choices[0].message.content;
  return new Response(JSON.stringify(data));
}
