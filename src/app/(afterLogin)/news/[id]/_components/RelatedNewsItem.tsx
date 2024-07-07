import Link from "next/link";
import BodyFont from "@/common/BodyFont";

export default function RelatedNewsItem() {
  return (
    <>
      <Link href="">
        <div className="">
          <BodyFont
            level="4"
            weight="medium"
            className="mb-[14px] line-clamp-1 text-grayscale-900"
          >
            엔비디아 또 신고가... 시총 2위 애플과 962억달러 차이
          </BodyFont>

          <aside className="text-[13px] text-grayscale-600 flex gap-2 before:content-['∙'] before:order-2">
            <span className="order-1">n시간 전</span>
            <span className="order-3">문화일보</span>
          </aside>
        </div>
      </Link>
    </>
  );
}
