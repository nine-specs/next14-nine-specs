import { useState, useRef } from "react";
import useFormStore from "@/store/useFormStore";

export function useFormCheck(description: string) {
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

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [descriptionText, setDescriptionText] = useState(description);
  const [styleStatus, setStyleStatus] = useState<
    "default" | "warning" | "success"
  >("default");
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "userId":
        setUserId(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "birthdate":
        setBirthdate(value);
        break;
      default:
        break;
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
    handleChange,
    inputRef,
    descriptionText,
    styleStatus,
    passwordMatch,
  };
}
