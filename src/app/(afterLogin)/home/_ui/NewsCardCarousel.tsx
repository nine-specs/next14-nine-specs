import BodyFont from "@/common/BodyFont";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { BASE_URL } from "@/constants";
import Link from "next/link";
import dayjs from "dayjs";

export default async function NewsCardCarousel() {
  const news = await (await fetch(`${BASE_URL}/api/my/news?category=popularNews&limit=5`)).json();

  return (
    <Carousel
      opts={{
        align: "start",
        // loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-5">
        {news.map((article: any) => (
          <CarouselItem key={article.newsId} className="pl-5 basis-1/3">
            <div className="h-[100px] border border-primary-200 rounded-2xl">
              <NewsCard {...article} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

const NewsCard = (props: any) => {
  const { creationTime, headLine, newsId } = props;

  const date = dayjs(creationTime);
  const formattedDate = date.format("YYYY.MM.DD");

  return (
    <Link href={`/news/${newsId}`}>
      <article className="flex justify-between items-center px-4 py-6">
        <div className="w-[243px]">
          <BodyFont level="5" weight="regular" className="text-grayscale-400">
            {formattedDate}
          </BodyFont>
          <BodyFont level="2" weight="bold" className="truncate">
            {headLine}
          </BodyFont>
        </div>
        <div className="w-12 h-12 bg-black rounded-full flex justify-center items-center text-white">icon</div>
      </article>
    </Link>
  );
};
