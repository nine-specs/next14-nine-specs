type IconButtonProps = React.ComponentProps<'button'> & {
  color?:
    | 'black'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'success'
    | 'grayscale'
    | 'outline'
    | 'yellow'
    | 'green'
    | 'outlineLight';
  size?: 'lg' | 'md' | 'sm';
  className?: string;
  children: React.ReactNode;
};

const colorVariants = {
  black: 'text-white bg-[#000]',
  primary: 'text-white bg-primary-900',
  secondary: 'text-white bg-secondary-500',
  warning: 'text-white bg-warning text-white',
  success: 'text-white bg-success text-white',
  outline: 'text-primary-900 bg-white border border-primary-900',
  grayscale: 'text-grayscale-600 bg-grayscale-200',
  yellow: 'text-white bg-[#FFE812]',
  green: 'text-white bg-[#03CF5D]',
  outlineLight: 'text-primary-[#E3E3E3] bg-white border border-[#E3E3E3]',
};

const sizeVariants = {
  lg: 'w-16 h-16',
  md: 'w-14 h-14',
  sm: 'w-9 h-9',
};

const disabled = 'text-grayscale-300 bg-grayscale-200';

export default function IconButton({
  color = 'black',
  size = 'lg',
  className,
  children,
  ...restButtonProps
}: IconButtonProps) {
  return (
    <>
      <button
        {...restButtonProps}
        className={`
        flex justify-center items-center
        rounded-full
        ${sizeVariants[size]}
        ${colorVariants[color]}
        ${restButtonProps.disabled ? disabled : ''}
        ${className}`}
      >
        {children}
      </button>
    </>
  );
}
