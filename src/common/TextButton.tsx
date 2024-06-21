import BodyFont from "./BodyFont";

type TextButtonProps = React.ComponentProps<"button"> & {
  variant?:
    | "primary"
    | "secondary"
    | "warning"
    | "success"
    | "outline"
    | "default";
  size?: "lg" | "md" | "sm";
  className?: string;
  children: React.ReactNode;
};

const variantVariants = {
  primary: "bg-primary-900 hover:bg-primary-800 text-white",
  secondary: "bg-secondary-500 hover:bg-secondary-300 text-white",
  warning: "bg-warning hover:bg-[#FF5271] text-white",
  success: "bg-success hover:bg-[#33E078] text-white",
  outline:
    "bg-white border border-primary-900 text-primary-900 hover:border-primary-800 hover:text-primary-800",
  default: "bg-grayscale-200 text-grayscale-600",
};

const disabledStyle =
  "bg-grayscale-200 text-grayscale-300 hover:bg-grayscale-200";

const sizeVariants: {
  [key in "lg" | "md" | "sm"]: { padding: string; level: "3" | "4" | "5" };
} = {
  lg: { padding: "py-[18px]", level: "3" },
  md: { padding: "py-[16px]", level: "4" },
  sm: { padding: "py-[8px]", level: "5" },
};

export default function TextButton({
  variant = "default",
  size = "lg",
  children,
  className,
  ...restButtonProps
}: TextButtonProps) {
  const { padding, level } = sizeVariants[size];

  return (
    <>
      <button
        {...restButtonProps}
        className={`w-full rounded-lg ${variantVariants[variant]} ${padding} ${
          restButtonProps.disabled ? disabledStyle : ""
        } ${className}`}
      >
        <BodyFont level={level} weight="medium">
          {children}
        </BodyFont>
      </button>
    </>
  );
}
