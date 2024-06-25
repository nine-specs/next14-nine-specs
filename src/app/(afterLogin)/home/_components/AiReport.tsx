import CardWrap from "@/common/CardWrap";
import Title from "../_ui/Title";

/**
 * 유저의 AI 리포트
 */
export default function AiReport() {
  return (
    <>
      <div>
        <Title title="스팩님의 AI 리포트" />

        <ul className="flex gap-5">
          {Array.from({ length: 3 }, (_, index) => (
            <li key={index} className="w-2/6 h-[304px]">
              <CardWrap width="100%" height="100%"></CardWrap>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
