export interface getLlamaReplyParams {
  token: string;
  userMessage: string;
  temperature: number;
  topP: number;
  stream: boolean;
}

/**
 * gpt 통신 함수 (스트림)
 * message를 받아서 gpt에 요청을 보내고 응답을 받아옴
 * @param {string} token - gpt 인증 토큰
 * @param {string} user_message - 사용자가 입력한 메세지
 * @param {number} temperature - 온도 값 (0~1 의 값)  창의성과 무작위성을 보이는 정도
 * 값이 높을 수록 다양한 답변이 나옴 일관된 답변을 위해서는 낮은 값을 사용
 * @param {number} topP - top_p 값 (0~1의 값) nucleus sampling 값 너무 빈번하게 발생하는 단어만을 선택하는 것을 방지
 * 값이 높을 수록  더 다양하고 흥미로운 텍스트를 생성할 수 있도록 하기 위해 사용
 * @param {boolean} stream - 스트림 여부
 * @returns
 */
export async function getLlamaReply({
  token,
  userMessage,
  temperature,
  topP,
  stream,
}: getLlamaReplyParams): Promise<string> {
  // 사용자가 입력한 메세지를 gpt에 요청을 보내기 위해 사전에 준비한 Propmt 형식으로 변환

  const generateBody = {
    user_message: userMessage,
    temperature: temperature,
    top_p: topP,
    stream: stream,
  };
  const URL = process.env.LLAMA_REPLY_URL || "";

  try {
    // let token = await gptTokenApi(); // 토큰을 인자로 받아 올 것인지 gpt 통신시 받아올 것인지 고민
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
      const reader = response.body.getReader(); // getReader를 사용하는 이유는 response.body가 스트림이기 때문에 스트림을 읽어오기 위해 사용
      // 스트림이란? 데이터를 조각조각 받아오는 것

      let result = ""; // 스트림 데이터를 저장할 변수
      while (true) {
        const { done, value } = await reader.read(); // reader.read()는 데이터의 조각 즉 스트림을 비동기적으로 읽어옴
        // done 은 스트림이 끝났는지 아닌지를 나타내는 값, value는 스트림의 데이터를 나타냄
        // 해당 작업이 끝나면 done이 true가 됨
        if (done) {
          return result; // 스트림이 끝나면 result를 반환
        }
        result += new TextDecoder().decode(value); // 스트림 데이터를 누적하여 result에 저장
      }
    }
    throw new Error("gptReplyApi 통신 에러");
  } catch (error) {
    throw new Error("gptReplyApi 통신 실패");
  }
}
