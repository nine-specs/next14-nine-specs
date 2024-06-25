import CHATBOT_ICON from "../../../public/images/Chatbot_icon.svg";

export default function Chatbot() {
  return (
    <>
      <button className="hover:animate-[wiggle_1s_ease-in-out_infinite] fixed right-16 bottom-9 w-20 h-20 bg-primary-900 flex items-center justify-center rounded-full shadow-[0_0_20px_0_rgba(24,37,76,0.5)]">
        <CHATBOT_ICON />
      </button>
    </>
  );
}
