import OpenAI from "openai";

export const getGptReply = async (system: string, message: string) => {
  const key = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({
    apiKey: key,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: system },
      { role: "user", content: message },
    ],
  });
  const data = response.choices[0].message.content;
  return data;
};
