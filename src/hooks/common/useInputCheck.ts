//이메일 인증 과 아이디중복체크 로직을 하나로 만든모습
import { useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";

export function useInputCheck(description: string, type: "id" | "email") {
  const [userInput, setUserInput] = useState(""); // 유저가 입력값 상태
  const [descriptionText, setDescriptionText] = useState(description); // 설명 텍스트 상태
  const [styleStatus, setStyleStatus] = useState<
    "default" | "warning" | "success"
  >("default");

  const inputRef = useRef<HTMLInputElement>(null);

  // 유저 입력 값 조회를 위한 로직
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    setStyleStatus("default");
    setDescriptionText(description); // 설명 텍스트 초기화
  };

  // 버튼 클릭 시 실행될 함수
  const handleButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault(); // 기본 동작 방지
    const input = userInput.trim(); // 입력값에서 공백 제거

    if (type === "id") {
      await handleIdCheck(input);
    } else if (type === "email") {
      await handleEmailCheck(input);
    }
  };

  // 아이디 중복 확인 로직
  const handleIdCheck = async (userId: string) => {
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
        console.log("이미 존재하는 userId입니다.");
        setStyleStatus("warning");
        setDescriptionText("중복된 아이디입니다. 다른 아이디를 사용해주세요.");
      } else {
        console.log("사용할 수 있는 userId입니다.");
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

  // 이메일 인증 로직
  const handleEmailCheck = async (email: string) => {
    if (!email) {
      console.log("이메일을 입력하세요.");
      alert("이메일을 입력해주세요.");
      setStyleStatus("warning");
      setDescriptionText("이메일을 입력해주세요.");
      return;
    }

    console.log(email);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      console.log(res);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data); // 성공적으로 받은 데이터 확인

      if (res.ok) {
        setStyleStatus("success");
        setDescriptionText(
          "인증 이메일이 발송되었습니다. 이메일을 확인해주세요.",
        );
      } else {
        setStyleStatus("warning");
        setDescriptionText(data.message || "인증 이메일 발송에 실패했습니다.");
      }
    } catch (error) {
      setStyleStatus("warning");
      setDescriptionText("인증 이메일 발송에 실패했습니다.");
      console.error("Fetch error:", error);
    }
  };

  return {
    userInput,
    handleChange,
    inputRef,
    handleButtonClick,
    styleStatus,
    descriptionText,
  };
}
