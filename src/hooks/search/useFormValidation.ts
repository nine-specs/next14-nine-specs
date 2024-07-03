import { useState, useEffect } from "react";

type UseFormValidationReturnType = {
  fields: Record<string, string>;
  isButtonDisabled: boolean;
  handleFieldChange: (fieldName: string, value: string) => void;
  styleStatus: "default" | "warning";
  descriptionText: string;
  updateDescriptionText: (text: string) => void;
  updateStyleStatus: (status: "default" | "warning") => void;
};

const useFormValidation = (
  description?: string,
): UseFormValidationReturnType => {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [styleStatus, setStyleStatus] = useState<"default" | "warning">(
    "default",
  );
  const [descriptionText, setDescriptionText] = useState<string>("");

  const validateFields = (fields: Record<string, string>) => {
    // 기본적인 필드 유효성 검사 (이름, 아이디, 이메일)
    const nameValid = /^[^\d\s~`!@#$%^&*()\-_=+[\]{}|\\;:'",.<>?/]+$/.test(
      fields.name || "",
    );//문자만 가능하도록
    const userIdValid = fields.userId && fields.userId.length >= 4; //최소 4글자 시작
    const emailValid = /\S+@\S+\.\S+/.test(fields.email || ""); //이메일 형식어야된다

    return nameValid && userIdValid && emailValid;
  };

  useEffect(() => {
    const areFieldsFilled = Object.values(fields).every(
      (field) => field.trim() !== "",
    );
    const areFieldsValid = validateFields(fields);
    const disabled = !areFieldsFilled || !areFieldsValid;
    setIsButtonDisabled(disabled);

    console.log("isButtonDisabled:", disabled);
  }, [fields]);

  const handleFieldChange = (fieldName: string, value: string) => {
    if (fieldName === "phone" && !/^\d{0,11}$/.test(value)) {
      return;
    }
    setFields((prevFields) => ({ ...prevFields, [fieldName]: value }));
    setStyleStatus("default"); // 필드 변경 시 스타일 초기화
    setDescriptionText(""); // 설명 텍스트 초기화
  };

  const updateDescriptionText = (text: string) => {
    setDescriptionText(text);
  };

  const updateStyleStatus = (status: "default" | "warning") => {
    setStyleStatus(status);
  };

  return {
    fields,
    isButtonDisabled,
    handleFieldChange,
    styleStatus,
    descriptionText,
    updateDescriptionText,
    updateStyleStatus,
  };
};

export default useFormValidation;
