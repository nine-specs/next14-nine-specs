// import { useState, useRef } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { firestore } from "@/firebase/firebaseConfig";

// export function useInputCheck(description: string, type: "userId" | "nick") {
//   const [userInput, setUserInput] = useState(""); // 유저가 입력값 상태
//   const [descriptionText, setDescriptionText] = useState(description); // 설명 텍스트 상태
//   const [styleStatus, setStyleStatus] = useState<
//     "default" | "warning" | "success"
//   >("default");
//   const [idChecked, setIdChecked] = useState(false); // 아이디 중복체크 상태관리
//   const [nickChecked, setNickChecked] = useState(false); // 닉네임 중복 체크 상태 관리
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

//   const inputRef = useRef<HTMLInputElement>(null);

//   // 유저 입력 값 조회를 위한 로직
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setUserInput(value);
//     setStyleStatus("default");
//     setDescriptionText(description); // 설명 텍스트 초기화

//     if (value.trim()) {
//       setIsButtonDisabled(false);
//     } else {
//       setIsButtonDisabled(true);
//     }
//   };

//   // 버튼 클릭 시 실행될 함수
//   const handleButtonClick = async (
//     event: React.MouseEvent<HTMLButtonElement>,
//   ) => {
//     event.preventDefault(); // 기본 동작 방지
//     const input = userInput.trim(); // 입력값에서 공백 제거

//     if (type === "userId") {
//       await handleIdCheck(input);
//     } else if (type === "nick") {
//       await handleNickCheck(input);
//     }
//   };

//   // 아이디 중복 확인 로직
//   const handleIdCheck = async (userId: string) => {
//     // 유효성 검사를 위한 정규식
//     const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_]{6,12}$/;

//     if (!userId) {
//       setStyleStatus("warning");
//       setDescriptionText("아이디를 입력해주세요.");
//       return;
//     }

//     if (!userIdRegex.test(userId)) {
//       setStyleStatus("warning");
//       setDescriptionText(
//         "아이디는 영문자와 숫자를 포함한 6~12자로 이루어져야 합니다.",
//       );
//       return;
//     }

//     try {
//       const querySnapshot = await getDocs(collection(firestore, "users"));
//       const existingUsers = querySnapshot.docs.map((doc) => doc.data().userId);

//       if (existingUsers.includes(userId)) {
//         setStyleStatus("warning");
//         setDescriptionText("중복된 아이디입니다. 다른 아이디를 사용해주세요.");
//       } else {
//         setStyleStatus("success");
//         setDescriptionText("사용 가능한 아이디입니다.");
//         setIdChecked(true);
//       }
//     } catch (error) {
//       console.error(
//         "파이어베이스에서 문서를 가져오는 중 오류가 발생했습니다:",
//         error,
//       );
//       setStyleStatus("warning");
//       setDescriptionText("오류가 발생했습니다. 다시 시도해주세요.");
//     }
//   };

//   // 닉네임 중복 확인
//   const handleNickCheck = async (nickname: string) => {
//     if (!nickname) {
//       setStyleStatus("warning");
//       setDescriptionText("닉네임을 입력해주세요.");
//       return;
//     }

//     try {
//       const querySnapshot = await getDocs(collection(firestore, "users"));
//       const existingNicks = querySnapshot.docs.map((doc) => doc.data().nick);

//       if (existingNicks.includes(nickname)) {
//         setStyleStatus("warning");
//         setDescriptionText("중복된 닉네임입니다. 다른 닉네임을 사용해주세요.");
//       } else {
//         setStyleStatus("success");
//         setDescriptionText("사용 가능한 닉네임입니다.");
//         setNickChecked(true);
//       }
//     } catch (error) {
//       console.error(
//         "파이어베이스에서 문서를 가져오는 중 오류가 발생했습니다:",
//         error,
//       );
//       setStyleStatus("warning");
//       setDescriptionText("오류가 발생했습니다. 다시 시도해주세요.");
//     }
//   };

//   return {
//     userInput,
//     handleChange,
//     inputRef,
//     handleButtonClick,
//     styleStatus,
//     descriptionText,
//     idChecked,
//     nickChecked,
//     isButtonDisabled,
//   };
// }
