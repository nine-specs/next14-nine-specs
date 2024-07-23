import NewsDetail from "./_components/NewsDetail";
import RelatedList from "./_components/RelatedList";

type NewsDetailPageProps = {
  params: {
    id: string;
  };
};

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  return (
    <>
      <div className="px-[120px] pt-10 pb-[70px] overflow-hidden flex gap-5 justify-center">
        <NewsDetail id={params.id} />
        <RelatedList />
      </div>
    </>
  );
}
