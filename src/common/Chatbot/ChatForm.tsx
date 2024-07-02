import BodyFont from "../BodyFont";
import TextButton from "../TextButton";

import CLOSE_ICON from "../../../public/images/Close_icon.svg";

import useChat from "./_hooks/useChat";
import MessageBox from "./MessageBox";

export default function ChatForm({ onClose }: { onClose: () => void }) {
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  return (
    <>
      <div className="fixed right-0 bottom-0 bg-white w-[480px] h-[640px] shadow-[0_0_16px_5px_rgba(123,123,123,0.25)] rounded-t-[40px] overflow-hidden">
        <header className="flex items-center justify-between h-16 bg-primary-900 text-white py-4 px-7">
          <BodyFont level="1" weight="bold">
            나우챗봇
          </BodyFont>
          <button onClick={onClose}>
            <CLOSE_ICON fill="#ffffff" width="32" height="32" />
          </button>
        </header>

        <section className="flex flex-col gap-6 py-8 px-4 h-[488px] overflow-scroll no-scrollbar">
          {messages.map((message) => (
            <MessageBox key={message.id} {...message} />
          ))}
        </section>

        <form
          onSubmit={handleSubmit}
          className="p-4 h-[88px] border-t w-full border-grayscale-200 flex justify-between gap-2"
        >
          <input
            className="border border-grayscale-300 flex-1 rounded-lg p-4 h-[58px] outline-none"
            value={input}
            onChange={handleInputChange}
          />
          <div className="w-[63px]">
            <TextButton
              type="submit"
              variant="primary"
              size="md"
              disabled={!input}
            >
              전송
            </TextButton>
          </div>
        </form>
      </div>
    </>
  );
}
