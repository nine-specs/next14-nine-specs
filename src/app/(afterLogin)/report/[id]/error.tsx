"use client";

import BodyFont from "@/common/BodyFont";
import CardWrap from "@/common/CardWrap";
import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className=" flex w-full h-[100vh] justify-center items-center">
      <CardWrap
        width="500px"
        className="flex flex-col gap-3 items-center p-8 "
      >
        <HeadingFont level="3" weight="bold" className="my-7">
          리포트 에러 페이지
        </HeadingFont>
        <div className="verflow-auto w-full my-6">
          <p>에러내용 : </p>
          <BodyFont
            level="4"
            weight="regular"
            className="text-red-600 text-wrap break-words"
          >
            {error.message}
          </BodyFont>
        </div>
        <div className="w-44 ">
          <TextButton
            variant={"primary"}
            size="sm"
            className="p-2"
            onClick={() => reset()}
          >
            새로고침
          </TextButton>
        </div>
      </CardWrap>
    </div>
  );
}
