type ButtonFontProps = React.ComponentProps<"button"> & {
  weight: "medium" | "regular";
  className?: string;
  children: React.ReactNode;
};

const weightVariants = {
  medium: "font-medium",
  regular: "font-normal",
};

export default function ButtonFont({
  weight,
  className,
  children,
  ...restButtonProps
}: ButtonFontProps) {
  return (
    <>
      <button
        type="button"
        {...restButtonProps}
        className={`text-[16px] leading-[24px] tracking-normal border-b ${
          weightVariants[weight]
        } ${className ? `${className} border-current` : "border-black"}`}
      >
        {children}
      </button>
    </>
  );
}
