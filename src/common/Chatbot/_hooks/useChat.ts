import { useEffect, useState } from "react";

export type MessagesType = {
  content: string;
  role: "user" | "ai";
  id: string;
};

const useChat = () => {
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [input, setInput] = useState("");
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

    if (userInput) {
      setMessages((prev) => [
        ...prev,
        { content: input, role: "user", id: Date.now().toString() },
      ]);
      setInput("");
    }

    try {
      const response = await fetch("http://localhost:3000/api/ai/stream");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const reader = response.body!.getReader();
      console.log("🚀 ~ handleSubmit ~ response:", response);

      let totalText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("모든 데이터를 성공적으로 읽었습니다.");
          break;
        }
        const text = new TextDecoder().decode(value);
        console.log("받은 데이터:", text);
        totalText += text;
      }

      setMessages((prev) => [
        ...prev,
        { content: totalText, role: "ai", id: Date.now().toString() },
      ]);
    } catch (error) {
      console.error("스트림 처리 중 에러:", error);
    } finally {
      setProcessing(false);
    }
  };

  return { messages, handleSubmit, input, handleInputChange, processing };
};

export default useChat;
