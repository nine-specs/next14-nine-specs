import GlobalErrorPage from "@/common/GlobalErrorPage";
import LoadingPage from "@/common/LoadingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 페이지",
  description: "404 페이지 입니다",
};

/**
 * ROOT NotFound 페이지
 * 페이지 경로가 잘못되었을 때 보여지는 404 페이지
 */
export default function NotFound() {
  return (
    <>
      <LoadingPage />;{/* <GlobalErrorPage />; */}
    </>
  );
}
