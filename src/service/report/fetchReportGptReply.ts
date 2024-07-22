import { reportGptPrompt } from "@/constants/report/reportGptPrompt";

export const fetchReportGptReply = async (code: string) => {
  const { system, message } = await reportGptPrompt(code);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/report/gptReplyStore`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system,
      message,
    }),
    cache: "no-store",
  });
  const responseMessage = await res.json(); // 응답 데이타가 ```json ``` 하고 시작하는 문자열이라서 json으로 변환하기 위해 문자열로 받아옴
  // console.log(responseMessage);
  // const jsonStart = responseMessage.indexOf("{");
  // const jsonEnd = responseMessage.lastIndexOf("}") + 1;
  // const jsonString = responseMessage.substring(jsonStart, jsonEnd);
  // const data = JSON.parse(jsonString);
  return responseMessage;
};
