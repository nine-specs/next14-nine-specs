import Link from "next/link";

import BodyFont from "@/common/BodyFont";
import CaptionFont from "@/common/CaptionFont";
import IconButton from "@/common/IconButton";

export default function RelatedStockItem() {
  return (
    <>
      <Link href="" className="flex justify-between">
        <div className="flex gap-4">
          <IconButton>icon</IconButton>
          <div>
            <BodyFont
              level="4"
              weight="bold"
              className="line-clamp-1 text-grayscale-900 mb-1"
            >
              애플
            </BodyFont>
            <BodyFont
              level="5"
              weight="regular"
              className="line-clamp-1 text-grayscale-900"
            >
              AAPL
            </BodyFont>
          </div>
        </div>

        <div className="text-right">
          <BodyFont
            level="5"
            weight="medium"
            className="line-clamp-1 text-grayscale-900 mb-1"
          >
            $00.00
          </BodyFont>
          <div className="flex gap-2">
            <CaptionFont weight="regular" className="text-secondary-600">
              ▼1.75
            </CaptionFont>
            <CaptionFont weight="regular" className="text-secondary-600">
              -0.82
            </CaptionFont>
          </div>
        </div>
      </Link>
    </>
  );
}
