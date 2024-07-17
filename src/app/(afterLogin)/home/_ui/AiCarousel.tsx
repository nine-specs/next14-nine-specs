import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { StockInfo } from "@/components/Report/type/report/stockType";
import FavorStockItem from "@/components/Report/FavorStockList/FavorStockItem";
import CardWrap from "@/common/CardWrap";

export function AiCarousel({ stocks }: { stocks: StockInfo[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-5">
        {stocks.map((stock) => (
          <CarouselItem key={stock.code} className="basis-1/3 pl-5">
            <CardWrap width="100%" height="100%" className="p-8">
              <FavorStockItem stockInfo={stock} />
            </CardWrap>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
