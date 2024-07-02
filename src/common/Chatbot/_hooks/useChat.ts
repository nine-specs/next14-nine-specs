import { useEffect, useState } from "react";

export type MessagesType = {
  content: string;
  role: "user" | "ai";
  id: string;
};

const useChat = () => {
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!messages.length) {
      setMessages([
        {
          content:
            "안녕하세요 아잇나우 챗봇입니다. 해외주식 관련해서 궁금하신 점이 있으면 저에게 물어보세요!",
          role: "ai",
          id: new Date().toLocaleString(),
        },
      ]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { content: input, role: "user", id: new Date().toLocaleString() },
      ]);
      setInput("");
    }
  };

  return { messages, handleSubmit, input, handleInputChange };
};

export default useChat;
