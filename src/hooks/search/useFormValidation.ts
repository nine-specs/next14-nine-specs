import { useState, useEffect } from "react";

const useFormValidation = (description: string) => {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [styleStatus, setStyleStatus] = useState<"default" | "warning">(
    "default",
  );
  const [descriptionText, setDescriptionText] = useState(description);

  const validateFields = (fields: Record<string, string>) => {
    const nameValid = /^[^\d\s~`!@#$%^&*()\-_=+[\]{}|\\;:'",.<>?/]+$/.test(
      fields.name || "",
    );
    const phoneValid = /^\d{1,11}$/.test(fields.phone || "");
    return nameValid && phoneValid;
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
    setDescriptionText(description); // 설명 텍스트 초기화
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
