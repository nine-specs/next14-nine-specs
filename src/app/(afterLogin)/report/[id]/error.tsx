"use client";

import CardWrap from "@/common/CardWrap";
import HeadingFont from "@/common/HeadingFont";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-3 w-full justify-center items-center">
      <CardWrap>
        <HeadingFont level="1" weight="bold">
          리포트 에러 페이지
        </HeadingFont>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          새로고침
        </button>
      </CardWrap>
    </div>
  );
}
