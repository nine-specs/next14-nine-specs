import { useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";

export function useIdCheck(description: string) {
  const [userInput, setUserInput] = useState(""); // 유저가 입력값 상태
  const [isValidUser, setIsValidUser] = useState(true); // 사용 가능한 userId 여부 상태
  const [descriptionText, setDescriptionText] = useState(description); // 설명 텍스트 상태
  const [styleStatus, setStyleStatus] = useState<
    "default" | "warning" | "success"
  >("default");

  const inputRef = useRef<HTMLInputElement>(null);

  // 유저 입력 값 조회를 위한 로직
  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    setIsValidUser(false); // 인풋 값이 변경될 때마다 유효성 상태 초기화
    setStyleStatus("default");
    setDescriptionText(description); // 설명 텍스트 초기화
  };

  // 중복 확인 버튼 클릭 시 실행될 함수
  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    const userId = userInput.trim(); // 입력값에서 공백 제거 후 userId로 설정

    // 유효성 검사를 위한 정규식
    const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_]{6,12}$/;

    if (!userId) {
      console.log("아이디를 입력하세요.");
      alert("아이디를 입력해주세요.");
      setStyleStatus("warning");
      setDescriptionText("아이디를 입력해주세요.");
      return;
    }

    if (!userIdRegex.test(userId)) {
      console.log("아이디 형식이 올바르지 않습니다.");
      // alert("아이디는 영문자와 숫자를 포함한 6~12자로 이루어져야 합니다.");
      setStyleStatus("warning");
      setDescriptionText(
        "아이디는 영문자와 숫자를 포함한 6~12자로 이루어져야 합니다.",
      );
      return;
    }

    try {
      // Firestore의 "users" 컬렉션에서 모든 문서 가져오기
      const querySnapshot = await getDocs(collection(firestore, "users"));

      // 가져온 문서에서 userId 필드값만 추출하여 배열로 변환
      const existingUsers = querySnapshot.docs.map((doc) => doc.data().userId);

      // 입력값과 일치하는 값이 있는지 확인
      if (existingUsers.includes(userId)) {
        console.log("이미 존재하는 userId입니다.");
        setIsValidUser(false); // 중복된 경우 유효하지 않은 userId로 설정
        setStyleStatus("warning");
        setDescriptionText("중복된 아이디입니다. 다른 아이디를 사용해주세요.");
      } else {
        console.log("사용할 수 있는 userId입니다.");
        setIsValidUser(true); // 사용 가능한 경우 유효한 userId로 설정
        setStyleStatus("success");
        setDescriptionText("* 사용가능한 아이디입니다.");
      }
    } catch (error) {
      console.error(
        "파이어베이스에서 문서를 가져오는 중 오류가 발생했습니다:",
        error,
      );
      setStyleStatus("warning");
      setDescriptionText("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return {
    userInput,
    handleUserIdChange,
    inputRef,
    handleButtonClick,
    isValidUser,
    styleStatus,
    descriptionText,
  };
}
