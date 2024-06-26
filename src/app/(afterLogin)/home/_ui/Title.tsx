import HeadingFont from "@/common/HeadingFont";

/**
 * 메인 Title
 */
export default function Title({ title }: { title: string }) {
  return (
    <>
      <HeadingFont level="4" weight="bold" className="text-primary-900 mb-6">
        {title}
      </HeadingFont>
    </>
  );
}
