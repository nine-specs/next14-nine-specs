import HeadingFont from "@/common/HeadingFont";

export default function Title({ title }: { title: string }) {
  return (
    <>
      <HeadingFont level="4" weight="bold" className="mb-6 text-primary-900">
        {title}
      </HeadingFont>
    </>
  );
}
