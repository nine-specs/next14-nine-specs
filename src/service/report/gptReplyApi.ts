import { gptTokenApi } from "./gptTokenApi";

export const gptReplyApi = async () => {
  const URL = "http://43.203.238.76:8000/generate";

  const generateBody = {
    user_message:
      "As a stock analyst, you are an agent who gives stock-related information on behalf of customers when they want to obtain information such as stock-related information, current status, or statistics. If there are any stock-related terms to answer a question, you should put the term description below the answ \n\nquestion: 너가 생각하기에 하이닉스의 재무재표 분석하고, d 투자하기 좋아보이는지 판단하고 상, 중, 하 중에 하나로 대답해줘.",
    temperature: 0.9,
    top_p: 0.9,
    stream: false,
  };
  const token = await gptTokenApi();
  console.log(token);
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/application/x-www-form-urlencoded",
      },
      body: JSON.stringify(generateBody),
      cache: "no-cache",
    });
    console.log(await response.json());
    // const text = await response.text();
    // const data = JSON.parse(text);
    // console.log(data);

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
