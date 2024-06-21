type HeadingFontProps = {
  level: "1" | "2" | "3" | "4";
  weight: "extrabold" | "bold" | "medium";
  className?: string;
  children: React.ReactNode;
};

const leveltVariants = {
  1: "text-[60px] leading-[72px] -tracking-[0.01em]",
  2: "text-[48px] leading-[140%] tracking-normal",
  3: "text-[36px] leading-[40px] tracking-normal",
  4: "text-[30px] leading-[36px] tracking-normal",
};
const weightVariants = {
  extrabold: "font-extrabold",
  bold: "font-bold",
  medium: "font-medium",
};

export default function HeadingFont({
  level,
  weight,
  className,
  children,
}: HeadingFontProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <>
      <Tag
        className={`${weightVariants[weight]} ${leveltVariants[level]} ${className}`}
      >
        {children}
      </Tag>
    </>
  );
}
