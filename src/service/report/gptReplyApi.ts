import { gptTokenApi } from "./gptTokenApi";

/**
 * gpt 통신 함수 (스트림)
 * message를 받아서 gpt에 요청을 보내고 응답을 받아옴
 * @param {string} user_message - 사용자가 입력한 메세지
 * @param {number} temperature - 온도
 * @param {number} top_p - top_p
 * @param {boolean} stream - 스트림 여부
 * @returns
 */
export async function gptReplyApi(
  user_message: string = `<|begin_of_text|><|start_header_id|>user<|end_header_id|>

한글로 답변하고 파리에 대해 알려줘<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
  temperature: number = 0.8,
  top_p: number = 0.8,
  stream: boolean = false,
): Promise<string | null> {
  const generateBody = {
    user_message: user_message,
    temperature: temperature,
    top_p: top_p,
    stream: stream,
  };
  const URL = process.env.NEXT_PUBLIC_GPT_REPLY_URL || "";
  try {
    let token = await gptTokenApi();
    console.log(token);
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(generateBody),
      cache: "no-store",
    });

    if (response && response.body) {
      const reader = response.body.getReader();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("통신 완료");
          return result;
        }
        result += new TextDecoder().decode(value);
      }
    }
    return null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
