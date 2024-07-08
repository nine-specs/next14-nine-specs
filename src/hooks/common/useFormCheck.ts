import { useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";
import useFormStore from "@/store/useFormStore";

export function useFormCheck(description: string, type: "userId" | "nick") {
  const {
    name,
    setName,
    userId,
    setUserId,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    phone,
    setPhone,
    birthdate,
    setBirthdate,
  } = useFormStore();

  const [passwordMatch, setPasswordMatch] = useState(true); //비밀번호 일치 관리
  const [descriptionText, setDescriptionText] = useState(description); //설명 텍스트 상태관리
  const [styleStatus, setStyleStatus] = useState<
    "default" | "warning" | "success"
  >("default"); //스타일 변화를 위한
  const [isButtonDisabled,setIsButtonDisabled] =useState(false)// 버튼활성화 상태관리

  const inputRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      userId.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      phone.trim() !== "" &&
      birthdate.trim() !== "" &&
      passwordMatch
    );
  };

  // 유저 입력 값 조회를 위한 로직
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserId(value);
    setStyleStatus("default");
    setDescriptionText(description); // 설명 텍스트 초기화
    if (value.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }

  };

  // 버튼 클릭 시 실행될 함수
  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    const input = userId.trim(); // 입력값에서 공백 제거

    if (type === "userId") {
      await handleIdCheck(input);
    } else if (type === "nick") {
      await handleNickCheck(input);
    }
  };

  // 아이디 중복 확인 로직
  const handleIdCheck = async (userId: string) => {
    const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_]{6,12}$/;

    if (!userId) {
      setStyleStatus("warning");
      setDescriptionText("아이디를 입력해주세요.");
      return;
    }

    if (!userIdRegex.test(userId)) {
      setStyleStatus("warning");
      setDescriptionText(
        "아이디는 영문자와 숫자를 포함한 6~12자로 이루어져야 합니다.",
      );
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const existingUsers = querySnapshot.docs.map((doc) => doc.data().userId);

      if (existingUsers.includes(userId)) {
        setStyleStatus("warning");
        setDescriptionText("중복된 아이디입니다. 다른 아이디를 사용해주세요.");
      } else {
        setStyleStatus("success");
        setDescriptionText("사용 가능한 아이디입니다.");
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

  // 닉네임 중복 확인 로직
  const handleNickCheck = async (nick: string) => {
    if (!nick) {
      setStyleStatus("warning");
      setDescriptionText("닉네임을 입력해주세요.");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const existingNicks = querySnapshot.docs.map((doc) => doc.data().nick);

      if (existingNicks.includes(nick)) {
        setStyleStatus("warning");
        setDescriptionText("중복된 닉네임입니다. 다른 닉네임을 사용해주세요.");
      } else {
        setStyleStatus("success");
        setDescriptionText("사용 가능한 닉네임입니다.");
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
    name,
    setName,
    userId,
    setUserId,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    phone,
    setPhone,
    birthdate,
    setBirthdate,
    isFormValid,
    handlePasswordChange,
    handleConfirmPasswordChange,
    passwordMatch,
    userInput: userId, // userId를 userInput으로 사용
    handleChange,
    inputRef,
    handleButtonClick,
    styleStatus,
    descriptionText,
    isButtonDisabled
  };
}
