import { useState, useEffect } from "react";

const useFormValidation = () => {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateFields = (fields: Record<string, string>) => {
    const nameValid = /^[^\d\s~`!@#$%^&*()\-_=+[\]{}|\\;:'",.<>?/]+$/.test(
      fields.name || "",
    );
    const phoneValid = /^\d{11}$/.test(fields.phone || "");
    return nameValid && phoneValid;
  };

  useEffect(() => {
    const areFieldsFilled = Object.values(fields).every(
      (field) => field.trim() !== "",
    );
    const areFieldsValid = validateFields(fields);
    setIsButtonDisabled(!(areFieldsFilled && areFieldsValid));
  }, [fields]);

  const handleFieldChange = (fieldName: string, value: string) => {
    if (fieldName === "phone" && !/^\d{0,11}$/.test(value)) {
      return;
    }

    setFields((prevFields) => ({ ...prevFields, [fieldName]: value }));
  };

  return {
    fields,
    isButtonDisabled,
    handleFieldChange,
  };
};

export default useFormValidation;
