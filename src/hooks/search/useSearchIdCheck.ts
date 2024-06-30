// import { useRef, useState } from "react";

// export function useIdCheck(description: string) {
//   const [userInput, setUserInput] = useState(""); // 유저가 입력값 상태
//   const [isSearchUserId, setIsSearchUserId] = useState(true); // 검색 상태 열부
//   const [descriptionText, setDescriptionText] = useState(description); // 설명 텍스트 상태
//   const [styleStatus, setStyleStatus] = useState<"default" | "warning">(
//     "default",
//   );

//   const inputRef = useRef<HTMLInputElement>(null);

//   // 유저 입력 값 조회를 위한 로직
//   const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUserInput(event.target.value);
//     setIsSearchUserId(false); // 인풋 값이 변경될 때마다 유효성 상태 초기화
//     setStyleStatus("default");
//     setDescriptionText(description); // 설명 텍스트 초기화
//   };

//   if (!userName) {
//     console.log("아이디를 입력하세요.");
//     alert("아이디를 입력해주세요.");
//     setStyleStatus("warning");
//     setDescriptionText("아이디를 입력해주세요.");
//     return;
//   }
// }
