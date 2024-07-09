import CardWrap from "@/common/CardWrap";
import Title from "../_ui/Title";
import AI_ICON from "../../../../../public/images/AI_icon.svg";
import Badge from "@/common/Badge";

/**
 * 유저의 AI 리포트
 */
export default function AiReport() {
  return (
    <>
      <div>
        <div className="flex gap-4 items-start">
          <Title title="스팩님의 AI 리포트" />
          <Badge text="AI" className="mb-6">
            <AI_ICON width="20" height="20" />
          </Badge>
        </div>

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
