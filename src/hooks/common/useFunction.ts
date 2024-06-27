import { useState, useEffect } from "react";

//입력값에 스타일 변화를 주기위함에 필요하다
export function useCheckInputEmpty(userInput: string) {
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  useEffect(() => {
    setIsInputEmpty(!userInput); // 입력 필드가 비어있는지 확인
  }, [userInput]);

  const buttonClass = isInputEmpty
    ? "bg-grayscale-200 text-grayscale-300"
    : "bg-primary-900 hover:bg-primary-700 text-white";

  return { isInputEmpty, buttonClass };
}
