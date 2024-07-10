import NewsArticle from "./_components/NewsArticle";
import RelatedList from "./_components/RelatedList";

export default function NewsDetail() {
  return (
    <>
      <div className="px-[120px] pt-10 pb-[70px] overflow-hidden flex gap-5 justify-center">
        <NewsArticle
          params={{
            id: "1",
          }}
        />
        <RelatedList />
      </div>
    </>
  );
}
