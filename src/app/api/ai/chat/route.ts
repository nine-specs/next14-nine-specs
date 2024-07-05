function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

async function* streamResponse(response: Response) {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    yield decoder.decode(value);
  }
}

export async function POST(request: Request) {
  const { userInput } = await request.json();

  const LLAMA_REPLY_URL = process.env.LLAMA_REPLY_URL as string;

  const system = `You're a professional stock advisor. You provide information and advice to clients about the stock market, individual stocks, and investment strategies. Please follow these guidelines:
  1. always provide objective, factual information.
  2. When using stock-related terms, add a brief explanation.
  3. Always mention the risks of investing and emphasize the importance of personal judgment.
  4. Do not make a 'buy' or 'sell' decision on a particular stock yourself, but only provide analytical information.
  5. Always write your answers to questions in Korean and summarize them in a maximum of three lines.
  6. Mention that you can provide additional information or detailed explanations if needed.

  All responses must be in Korean only. Do not use any other language under any circumstances. Make sure to answer that you don't know about any topics other than stocks.`;

  const generateBody = {
    user_message: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>${system}<|eot_id|><|start_header_id|>user<|end_header_id|>${userInput}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
    temperature: 0.5,
    top_p: 0.5,
  };

  const token = await (
    await fetch("http://localhost:3000/api/ai/token", { cache: "no-store" })
  ).json();

  const response = await fetch(LLAMA_REPLY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(generateBody),
  });

  // console.log("🚀 ~ POST ~ response:", response.status);

  if (!response.body) {
    return Response.json({ error: "No response body" }, { status: 500 });
  }

  const iterator = streamResponse(response);
  const stream = iteratorToStream(iterator);

  return new Response(stream);
}
