type BodyFontProps = {
  level: "1" | "2" | "3" | "4" | "5";
  weight: "bold" | "medium" | "regular";
  className?: string;
  children: React.ReactNode;
};

const leveltVariants = {
  1: "text-[24px] leading-[32px] tracking-normal",
  2: "text-[20px] leading-[28px] tracking-normal",
  3: "text-[18px] leading-[28px] tracking-normal",
  4: "text-[16px] leading-[24px] tracking-normal",
  5: "text-[14px] leading-[20px] tracking-normal",
};
const weightVariants = {
  bold: "font-bold",
  medium: "font-medium",
  regular: "font-normal",
};

export default function BodyFont({
  level,
  weight,
  className,
  children,
}: BodyFontProps) {
  return (
    <>
      <p
        className={`${weightVariants[weight]} ${leveltVariants[level]} ${className}`}
      >
        {children}
      </p>
    </>
  );
}
