"use client";

import CardWrap from "@/common/CardWrap";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex items-center w-[100vw] h-[100vh] justify-center">
      <CardWrap>
        <h2>리포트 페이지 오류!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </CardWrap>
    </section>
  );
}
