type CaptionProps = {
  weight: "medium" | "regular";
  className?: string;
  children: React.ReactNode;
};

const weightVariants = {
  medium: "font-medium",
  regular: "font-normal",
};

export default function Caption({ weight, className, children }: CaptionProps) {
  return (
    <>
      <p
        className={`text-[12px] leading-[16px] tracking-normal ${weightVariants[weight]} ${className}`}
      >
        {children}
      </p>
    </>
  );
}
