import BodyFont from "@/common/BodyFont";

export default function Heading({ heading }: { heading: string }) {
  return (
    <>
      <BodyFont level="3" weight="bold" className="text-grayscale-900">
        {heading}
      </BodyFont>
    </>
  );
}
