import { useState } from "react";

export function useFormCheck() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    // 비밀번호 변경 시 일치 여부 다시 확인
    setPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    // 비밀번호 확인 변경 시 일치 여부 다시 확인
    setPasswordMatch(password === value);
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      phone.trim() !== "" &&
      birthdate.trim() !== "" &&
      passwordMatch // 비밀번호 일치 여부도 추가
    );
  };

  return {
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    phone,
    setPhone,
    birthdate,
    setBirthdate,
    isFormValid,
    // 비밀번호 관련 핸들러와 상태 추가
    handlePasswordChange,
    handleConfirmPasswordChange,
    passwordMatch,
  };
}
