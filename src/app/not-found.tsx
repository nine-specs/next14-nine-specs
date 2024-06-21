import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
      <h1>임시 Not Fount Page</h1>
      <p>경로가 올바르지 않을때 표시되는 페이지 입니다</p>
      <Link className="border border-black p-5" href="/">
        홈으로 이동하기
      </Link>
    </div>
  );
}
