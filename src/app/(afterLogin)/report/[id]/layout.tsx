import { Metadata } from "next";

export const metadata: Metadata = {
  title: "리포트 페이지",
  description: "리포트 페이지 입니다",
};
export default function layout({ children }: { children: React.ReactNode }) {
    
  return <div>{children}</div>;
}
