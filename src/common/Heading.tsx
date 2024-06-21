type HeadingProps = {
  level: "h1" | "h2" | "h3" | "h4";
  weight: "extrabold" | "bold" | "medium";
  children: React.ReactNode;
};

const leveltVariants = {
  h1: "text-[60px] leading-[72px] -tracking-[0.01em]",
  h2: "text-[48px] leading-[140%] tracking-normal",
  h3: "text-[36px] leading-[40px] tracking-normal",
  h4: "text-[30px] leading-[36px] tracking-normal",
};
const weightVariants = {
  extrabold: "font-extrabold",
  bold: "font-bold",
  medium: "font-medium",
};

export default function Heading({ level, weight, children }: HeadingProps) {
  const Tag = level;

  return (
    <>
      <Tag className={`${weightVariants[weight]} ${leveltVariants[level]}`}>
        {children}
      </Tag>
    </>
  );
}
