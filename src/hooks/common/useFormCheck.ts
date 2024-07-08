import { useState } from "react";
import useFormStore from "@/store/useFormStore";

export function useFormCheck() {
  const {
    name,
    setName,
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

  const [passwordMatch, setPasswordMatch] = useState(true);

  // 비밀번호 입력 핸들러
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
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      phone.trim() !== "" &&
      birthdate.trim() !== "" &&
      passwordMatch
    );
  };

  return {
    name,
    setName,
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
  };
}
