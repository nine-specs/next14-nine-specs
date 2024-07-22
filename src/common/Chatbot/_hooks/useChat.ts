import { useEffect, useRef, useState } from "react";

import { system } from "@/constants/prompt/chat";
import fetchAiReply from "@/service/fetchAiReply";
import useChatStore from "@/store/chatStore";

const useChat = () => {
  const [input, setInput] = useState("");
  const aiMessageRef = useRef<string>("");
  const [processing, setProcessing] = useState(false);

  const { messages, addMessage, updateLastAiMessage, clearMessages } = useChatStore((state) => ({
    messages: state.messages,
    addMessage: state.addMessage,
    updateLastAiMessage: state.updateLastAiMessage,
    clearMessages: state.clearMessages,
  }));

  useEffect(() => {
    if (!messages.length) {
      clearMessages();
      addMessage({
        content: "안녕하세요 아잇나우 챗봇입니다. 해외주식 관련해서 궁금하신 점이 있으면 저에게 물어보세요!",
        role: "ai",
        id: Date.now().toString(),
      });
    }
  }, [messages, clearMessages, addMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userInput = input.trim();
    if (!userInput) return;
    if (processing) return;

    setProcessing(true);

    addMessage({ content: userInput, role: "user", id: Date.now().toString() });

    setInput("");

    const prompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>${system}<|eot_id|><|start_header_id|>user<|end_header_id|>${userInput}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`;

    await fetchAiReply({
      prompt,
      onAiMessageHandler: (aiMessage) => {
        aiMessageRef.current = aiMessage;
        updateLastAiMessage(aiMessageRef.current);
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
