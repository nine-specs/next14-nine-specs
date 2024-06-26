import BodyFont from "../BodyFont";
import TextButton from "../TextButton";

import CLOSE_ICON from "../../../public/images/Close_icon.svg";

export default function ChatForm({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed right-0 bottom-0 bg-white w-[480px] h-[640px] shadow-[0_0_16px_5px_rgba(123,123,123,0.25)] rounded-t-[40px] overflow-hidden">
        <div className="flex items-center justify-between h-16 bg-primary-900 text-white py-4 px-7">
          <BodyFont level="1" weight="bold">
            나우챗봇
          </BodyFont>
          <button onClick={onClose}>
            <CLOSE_ICON fill="#ffffff" width="32" height="32" />
          </button>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-4 absolute bottom-0 h-[88px] border-t w-full border-grayscale-200 flex justify-between gap-2"
        >
          <input
            type="text"
            className="border border-grayscale-300 flex-1 rounded-lg p-4"
          />
          <div className="w-[63px]">
            <TextButton type="submit" variant="primary" size="md">
              전송
            </TextButton>
          </div>
        </form>
      </div>
    </>
  );
}
