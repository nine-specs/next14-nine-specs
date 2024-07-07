import BodyFont from "@/common/BodyFont";
import Link from "next/link";

export default function MoreButton() {
  return (
    <>
      <Link href="">
        <BodyFont level="5" weight="regular" className="text-grayscale-600">
          더보기 →
        </BodyFont>
      </Link>
    </>
  );
}
