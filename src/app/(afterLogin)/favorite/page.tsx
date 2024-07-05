import ButtonFont from "@/common/ButtonFont";
import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import FavoriteStockItem from "./_components/FavoriteStockItem";

export default function favoritePage() {
  return (
    <>
      <div className="w-[1214px] h-auto  flex flex-col justify-between gap-6 mx-auto  mt-[56px]">
        <div className="w-[1214px] h-9  flex justify-between">
          <HeadingFont level="4" weight="bold" className="text-primary-900">
            김스팩님의 관심종목
          </HeadingFont>
          <TextButton variant="primary" size="sm" className="w-[189px]">
            관심종목 추가
          </TextButton>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div className="w-[1214px] h-[360px]  flex justify-between gap-[19px]">
            <FavoriteStockItem />
            <FavoriteStockItem />
            <FavoriteStockItem />
          </div>
          <div className="w-[1214px] h-[360px]  flex justify-between gap-[19px]">
            <FavoriteStockItem />
            <FavoriteStockItem />
            <FavoriteStockItem />
          </div>
        </div>
      </div>
    </>
  );
}
