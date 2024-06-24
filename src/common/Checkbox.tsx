import React from "react";

interface InputProps {
  children?: React.ReactNode;
}

export default function Checkbox({ children }: InputProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 [&>input:checked+label:before]:content-['✓'] [&>input:checked+label:before]:text-white [&>input:checked+label:before]:flex [&>input:checked+label:before]:justify-center [&>input:checked+label:before]:items-center ">
          <input type="checkbox" className="hidden" id="custom-checkbox" />
          <label
            htmlFor="custom-checkbox"
            className="w-5 h-5 inline-block rounded-[5px] bg-primary-900 peer-checked:bg-primary-100  cursor-pointer"
          ></label>
          {children}
        </div>
      </div>
    </>
  );
}
