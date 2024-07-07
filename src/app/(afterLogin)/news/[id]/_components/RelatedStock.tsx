import BodyFont from "@/common/BodyFont";
import ListWrap from "@/common/ListWrap";
import RelatedStockItem from "./RelatedStockItem";

export default function RelatedStock() {
  return (
    <>
      <ListWrap
        width="382px"
        height="auto"
        padding="md"
        className="flex flex-col gap-5"
      >
        <BodyFont level="3" weight="bold" className="text-primary-900">
          현재 뉴스와 관련된 주식
        </BodyFont>
        <ul>
          {Array.from({ length: 3 }, (_, index) => (
            <li key={index} className="mb-5 last:mb-0">
              <RelatedStockItem />
            </li>
          ))}
        </ul>
      </ListWrap>
    </>
  );
}
