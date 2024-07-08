import BodyFont from "./BodyFont";

type BadgeProps = {
  variant?: "primary" | "secondary" | "light";
  size?: "left" | "right";
  children: React.ReactNode;
  text: string;
  className?: string;
};

const variantVariants = {
  primary: "bg-primary-900 text-white",
  secondary: "bg-secondary-50 text-secondary-900",
  light: "bg-primary-50 text-primary-900",
};

export default function Badge({
  variant = "primary",
  size = "left",
  children,
  text,
  className,
}: BadgeProps) {
  const isRight = size === "right";

  return (
    <>
      <div
        className={`py-1 px-2 flex gap-1 items-center rounded ${
          variantVariants[variant]
        } ${isRight ? "flex-row-reverse" : "flex-row"} ${className}`}
      >
        <div className="w-5 h-5">{children}</div>
        <BodyFont level="4" weight="medium">
          {text}
        </BodyFont>
      </div>
    </>
  );
}
