import { useState, useEffect } from "react";
import { useInputCheck } from "./useInputCheck";

export function useFormCheck() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
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
