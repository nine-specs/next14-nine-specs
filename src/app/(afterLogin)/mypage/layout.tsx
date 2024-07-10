import HeadingFont from "@/common/HeadingFont";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-background w-full h-auto flex flex-grow justify-center box-border "
      id="background"
    >
      <div
        className="min-w-[1200px] h-auto mt-[56px] box-border "
        id="container"
      >
        <HeadingFont level="4" weight="bold" className="text-primary-900">
          마이페이지
        </HeadingFont>
        {children}
      </div>
    </div>
  );
}
