// import IconButton from "@/common/IconButton";
import BodyFont from "@/common/BodyFont";
import SubTitle from "../../_ui/SubTitle";
import Link from "next/link";

/**
 * 관심 종목 뉴스
 */
export default function FavoriteStockNews() {
  return (
    <>
      <div>
        <SubTitle subTitle="관심 종목" />
        <ul className="flex gap-5">
          {Array.from({ length: 3 }, (_, index) => (
            <li
              key={index}
              className="w-1/3 h-[100px] border border-primary-200 rounded-2xl"
            >
              <StockCard />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/**
 * 종목 카드
 */
const StockCard = () => {
  return (
    <Link href={""}>
      <article className="flex justify-between items-center px-4 py-6">
        <div className="w-[243px]">
          <BodyFont level="5" weight="regular" className="text-grayscale-400">
            2024.06.04
          </BodyFont>
          <BodyFont level="2" weight="bold" className="truncate">
            中제외 배터리 시장, 중국업체 급성장하는데
          </BodyFont>
        </div>
        <div className="w-12 h-12 bg-black rounded-full flex justify-center items-center text-white">
          icon
        </div>
      </article>
    </Link>
  );
};
