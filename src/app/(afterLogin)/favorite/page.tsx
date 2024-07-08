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
          <div className="w-[189px]">
            <TextButton variant="primary" size="sm">
              관심종목 추가
            </TextButton>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div className="w-[1214px] h-[360px]  flex justify-between gap-[19px]">
            <FavoriteStockItem myStock="테슬라" />
            <FavoriteStockItem myStock="애플" />
            <FavoriteStockItem myStock="MS" />
          </div>
          <div className="w-[1214px] h-[360px]  flex justify-between gap-[19px]">
            <FavoriteStockItem myStock="구글" />
            <FavoriteStockItem myStock="유니티" />
            <FavoriteStockItem myStock="아마존" />
          </div>
        </div>
      </div>
    </>
  );
}
