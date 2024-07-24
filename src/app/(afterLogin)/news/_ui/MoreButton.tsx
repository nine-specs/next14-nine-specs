import BodyFont from "@/common/BodyFont";
import { NewsResponse } from "@/types/news";
import Link from "next/link";

export default function MoreButton(props: any) {
  const { newsId } = props;
  return (
    <>
      <Link href={`/news/${newsId}`}>
        <BodyFont level="5" weight="regular" className="text-grayscale-600">
          더보기 →
        </BodyFont>
      </Link>
    </>
  );
}
