const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

interface AiReplyParams {
  prompt: string;
  temperature?: number;
  top_p?: number;
  onAiMessageHandler: (value: string) => void;
  onFinally?: () => void;
}

async function fetchAiReply({
  prompt,
  temperature = 0.5,
  top_p = 0.5,
  onAiMessageHandler,
  onFinally,
}: AiReplyParams) {
  try {
    const aiResponse = await fetch(`${BASE_URL}/api/ai/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, temperature, top_p }),
    });

    if (!aiResponse.ok) {
      throw new Error("Network response was not ok.");
    }

    if (!aiResponse.body) {
      return Response.json({ error: "No response body" }, { status: 500 });
    }

    const reader = aiResponse.body.getReader();

    let aiMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("모든 데이터를 성공적으로 읽었습니다.");
        break;
      }

      const text = new TextDecoder().decode(value);
      aiMessage += text;

      onAiMessageHandler(aiMessage);
    }
  } catch (error) {
    console.error("스트림 처리 중 에러:", error);
  } finally {
    if (onFinally) onFinally();
  }
}

export default fetchAiReply;
