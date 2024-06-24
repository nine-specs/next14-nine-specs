// "use client";

// import Image from "next/image";
// import useFuntion from "../_hooks/useFuntion";

// interface InputProps {
//   type?: string;
//   placeholder: string; //필수 값
//   value?: string;
//   label?: string;
//   description?: string;
//   checkLabel?: string;
//   className?: string;

//   children?: React.ReactNode;
// }

// export default function Input({
//   type = "text", //기본 속성타입
//   placeholder,
//   value,
//   label,
//   description,
//   checkLabel,
//   children,
//   className,
// }: InputProps) {
//   const { isPasswordVisible, togglePasswordVisibility } = useFuntion();
//   const inputType = type === "password" && isPasswordVisible ? "text" : type;

//   return (
//     <>
//       <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
//         <div className="self-stretch rounded-lg bg-grayscale-0 flex flex-row items-center justify-between py-3.5 px-[15px] gap-[16px] border-[1px] border-solid border-grayscale-300">
//           <input
//             className="w-[314px] [border:none] [outline:none] font-body-5-r text-base bg-[transparent] h-6 relative leading-[24px] text-grayscale-400 text-left flex items-center max-w-[314px] p-0"
//             placeholder={placeholder}
//             type={inputType}
//           />
//           <button type="button" onClick={togglePasswordVisibility}>
//             <Image
//               alt={isPasswordVisible ? "Hide Password" : "Show Password"}
//               src={
//                 isPasswordVisible
//                   ? "/images/EyeShow_icon.svg"
//                   : "/images/EyeHide_icon.svg"
//               }
//               width={24}
//               height={24}
//             />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
