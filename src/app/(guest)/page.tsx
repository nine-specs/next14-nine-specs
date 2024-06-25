import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import Image from "next/image";
import Link from "next/link";

import MOCKUP_IMG from "../../../public/images/main/mockup_img.png";
import Header from "@/common/Header/Header";

export default function Home() {
  return (
    <div className="h-screen bg-main bg-no-repeat bg-cover flex flex-col justify-between">
      <Header />
      <main>
        <div className="text-grayscale-0 text-center">
          <HeadingFont level="1" weight="medium" className="mb-6">
            해외주식은 <span className="font-extrabold">아잇나우</span>와 함께!
          </HeadingFont>
          <HeadingFont level="4" weight="medium" className="mb-14">
            해외 주식 뉴스 실시간 번역과 <br />
            AI 애널리스트가 알려주는 어려운 해외주식 리포트
          </HeadingFont>
          <div className="w-[386px] mx-auto">
            <Link href={"/login"}>
              <TextButton variant="primary">로그인</TextButton>
            </Link>
          </div>
        </div>
      </main>
      <Image
        src={MOCKUP_IMG}
        alt="아잇나우 사이트 이미지"
        width={1038}
        className="mx-auto"
      />
    </div>
  );
}
