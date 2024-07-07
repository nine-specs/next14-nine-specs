import RelatedStock from "./RelatedStock";
import RelatedNews from "./RelatedNews";

export default function RelatedList() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <RelatedStock />
        <RelatedNews />
      </div>
    </>
  );
}
