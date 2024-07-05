import { useEffect, useRef, useState } from "react";

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

    try {
      const chatResponse = await fetch("http://localhost:3000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      if (!chatResponse.ok) {
        throw new Error("Network response was not ok.");
      }

      if (!chatResponse.body) {
        return Response.json({ error: "No response body" }, { status: 500 });
      }

      const reader = chatResponse.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("모든 데이터를 성공적으로 읽었습니다.");
          break;
        }
        const text = new TextDecoder().decode(value);
        // console.log("받은 데이터:", text);

        aiMessageRef.current += text;

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
      }

      aiMessageRef.current = "";
    } catch (error) {
      console.error("스트림 처리 중 에러:", error);
    } finally {
      setProcessing(false);
    }
  };

  return { messages, handleSubmit, input, handleInputChange, processing };
};

export default useChat;
