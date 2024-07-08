import BodyFont from "@/common/BodyFont";
import ListWrap from "@/common/ListWrap";
import RelatedNewsItem from "./RelatedNewsItem";

export default function RelatedNews() {
  return (
    <>
      <ListWrap
        width="382px"
        height="auto"
        padding="md"
        className="flex flex-col gap-5"
      >
        <BodyFont level="3" weight="bold" className="text-primary-900">
          관련 기사
        </BodyFont>
        <ul>
          {Array.from({ length: 3 }, (_, index) => (
            <li
              key={index}
              className="border-b border-grayscale-400 pb-[14px] mb-[14px] last:border-none last:pb-0 last:mb-0"
            >
              <RelatedNewsItem />
            </li>
          ))}
        </ul>
      </ListWrap>
    </>
  );
}
