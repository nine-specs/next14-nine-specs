import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MessagesType = {
  content: string;
  role: "user" | "ai";
  id: string;
};

interface ChatState {
  messages: MessagesType[];
  addMessage: (message: MessagesType) => void;
  updateLastAiMessage: (content: string) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      updateLastAiMessage: (content) =>
        set((state) => {
          const updatedMessages = [...state.messages];
          const lastIndex = updatedMessages.length - 1;

          if (updatedMessages[lastIndex]?.role === "ai") {
            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              content,
            };
          } else {
            updatedMessages.push({
              content,
              role: "ai",
              id: Date.now().toString(),
            });
          }

          return { messages: updatedMessages };
        }),
      clearMessages: () => set({ messages: [] }),
    }),
    { name: "chatStore" },
  ),
);

export default useChatStore;
