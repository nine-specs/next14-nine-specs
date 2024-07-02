import { useState } from "react";

export type MessagesType = {
  content: string;
  role: "user" | "ai";
  id: string;
};

const useChat = () => {
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [input, setInput] = useState("");

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
