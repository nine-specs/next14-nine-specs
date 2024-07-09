import { useEffect, useRef, useState } from "react";

import { system } from "@/constants/prompt/chat";
import fetchAiReply from "@/service/fetchAiReply";

export type MessagesType = {
  content: string;
  role: "user" | "ai";
  id: string;
};

const useChat = () => {
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [input, setInput] = useState("");
  const aiMessageRef = useRef<string>("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!messages.length) {
      setMessages([
        {
          content:
            "안녕하세요 아잇나우 챗봇입니다. 해외주식 관련해서 궁금하신 점이 있으면 저에게 물어보세요!",
          role: "ai",
          id: Date.now().toString(),
        },
      ]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (processing) return;
    setProcessing(true);

    const userInput = input.trim();
    if (!userInput) return;

    setMessages((prev) => [
      ...prev,
      { content: input, role: "user", id: Date.now().toString() },
    ]);
    setInput("");

    const prompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>${system}<|eot_id|><|start_header_id|>user<|end_header_id|>${userInput}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`;

    await fetchAiReply({
      prompt,
      onAiMessageHandler: (aiMessage) => {
        aiMessageRef.current = aiMessage;

        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastIndex = updatedMessages.length - 1;

          if (updatedMessages[lastIndex]?.role === "ai") {
            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              content: aiMessageRef.current,
            };
          } else {
            updatedMessages.push({
              content: aiMessageRef.current,
              role: "ai",
              id: Date.now().toString(),
            });
          }

          return updatedMessages;
        });
      },
      onFinally: () => {
        aiMessageRef.current = "";
        setProcessing(false);
      },
    });
  };

  return { messages, handleSubmit, input, handleInputChange, processing };
};

export default useChat;
