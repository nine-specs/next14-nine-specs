interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  description?: string;
  duplicateCheckLabel?: string;
  className?: string;
  onDuplicateCheck?: () => void;
}

export default function Input({
  type,
  placeholder,
  value,
  label,
  description,
  duplicateCheckLabel,
}: InputProps) {
  return (
    <div className=" w-96 h-auto rounded-lg flex flex-col p-4 box-border">
      {label && <label className="block mb-2">{label}</label>}
      <div className="relative w-full">
        <input
          className="w-full h-14 rounded-lg border border-gray-300 p-2.5 box-border text-black"
          type={type}
          placeholder={placeholder}
          value={value}
        />
        {duplicateCheckLabel && (
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 rounded-lg border border-gray-300 px-4 bg-gray-200 cursor-pointer">
            {duplicateCheckLabel}
          </button>
        )}
      </div>
      {description && <label className="block mt-2">{description}</label>}
    </div>
  );
}
