import BodyFont from "@/common/BodyFont";
import CardWrap from "@/common/CardWrap";
import HeadingFont from "@/common/HeadingFont";
import Link from "next/link";

/**
 * ROOT NotFound 페이지
 * 페이지 경로가 잘못되었을 때 보여지는 404 페이지
 */
export default function NotFound() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <CardWrap width="609px" height="460px">
        <div className="flex flex-col justify-center items-center w-full h-full  p-20">
          <div className="flex justify-center mb-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 65 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="32.5"
                cy="31.9996"
                r="31.973"
                transform="rotate(-0.0484553 32.5 31.9996)"
                fill="#C0C8D9"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31.9847 13.3474C33.4562 13.3461 34.6501 14.538 34.6514 16.0095L34.6694 37.3248C34.6707 38.7963 33.4788 39.9902 32.0073 39.9915C30.5357 39.9927 29.3418 38.8008 29.3406 37.3293L29.3226 16.014C29.3213 14.5425 30.5132 13.3486 31.9847 13.3474Z"
                fill="white"
              />
              <path
                d="M34.6826 47.9822C34.6839 49.4537 33.492 50.6476 32.0205 50.6488C30.549 50.6501 29.3551 49.4582 29.3538 47.9867C29.3526 46.5152 30.5445 45.3213 32.016 45.32C33.4875 45.3188 34.6814 46.5107 34.6826 47.9822Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="space-y-4 text-center mb-9">
            <HeadingFont level="4" weight="bold">
              요청하신 페이지를 찾을 수 없습니다.
            </HeadingFont>
            <BodyFont level="3" weight="medium">
              페이지의 주소가 잘못 입력되었거나 <br />
              주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
            </BodyFont>
          </div>
          <Link
            className="bg-primary-900 hover:bg-primary-800 text-white w-[386px] py-[18px] rounded-lg flex justify-center items-center"
            href="/"
          >
            홈으로 이동하기
          </Link>
        </div>
      </CardWrap>
    </div>
  );
}
