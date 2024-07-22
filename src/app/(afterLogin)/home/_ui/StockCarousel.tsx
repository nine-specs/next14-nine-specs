import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { StockInfo } from "@/components/Report/type/report/stockType";
import StockItem from "@/common/StockItem/StockItem";

export function StockCarousel({ stocks }: { stocks: StockInfo[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full"
    >
      <CarouselContent className="mt-0 h-[320px]">
        {stocks.map((stock) => (
          <CarouselItem key={stock.code} className="py-2 basis-1/4">
            <StockItem {...stock} size="lg" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
