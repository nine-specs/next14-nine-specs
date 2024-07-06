import { Metadata } from "next";

export const metadata: Metadata = {
  title: "뉴스 | 아잇나우",
  description: "주식 뉴스를 볼 수 있는 페이지입니다.",
};
export default function layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
