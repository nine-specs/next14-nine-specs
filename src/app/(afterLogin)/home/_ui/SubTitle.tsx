import BodyFont from "@/common/BodyFont";

/**
 * 메인 SubTitle
 */
export default function SubTitle({ subTitle }: { subTitle: string }) {
  return (
    <>
      <BodyFont
        level="1"
        weight="medium"
        className="text-primary-900 mb-4 last:mb-0"
      >
        {subTitle}
      </BodyFont>
    </>
  );
}
