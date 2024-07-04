type ListWrapProps = {
  bgColor?: string;
  width?: string;
  height?: string;
  padding?: "sm" | "lg";
  border?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const paddingVariants = {
  lg: "p-8",
  sm: "px-4 py-6",
};

const bordered = "border border-primary-200 box-border";

export default function ListWrap({
  bgColor = "white",
  width = "320px",
  height = "240px",
  padding = "lg",
  border = false,
  className,
  children,
}: ListWrapProps) {
  return (
    <>
      <section
        className={`rounded-2xl min-w-[320px]
        ${paddingVariants[padding]}
        ${border ? bordered : ""}
        ${className}
        `}
        style={{
          backgroundColor: bgColor,
          width,
          height,
        }}
      >
        {children}
      </section>
    </>
  );
}
