import { useState, useEffect } from "react";

const useFormValidation = () => {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const areFieldsFilled = Object.values(fields).every(
      (field) => field.trim() !== "",
    );
    setIsButtonDisabled(!areFieldsFilled);
  }, [fields]);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFields((prevFields) => ({ ...prevFields, [fieldName]: value }));
  };

  return {
    fields,
    isButtonDisabled,
    handleFieldChange,
  };
};

export default useFormValidation;
