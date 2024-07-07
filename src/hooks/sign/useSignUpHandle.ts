import { useState } from "react";
import { register } from "./useSign";
import { useRouter } from "next/navigation";

type HandleSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleModalCloseType = () => void;

export const useSinupHandle = (
  userEmail: string,
): {
  handleSubmit: HandleSubmitType;
  handleModalClose: HandleModalCloseType;
  modalMessage: string;
  isModalVisible: boolean;
} => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  const handleSubmit: HandleSubmitType = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await register(formData, userEmail);
    console.log("폼값:", result);

    if (result?.success) {
      setModalMessage("회원가입이 완료되었습니다!");
      setIsModalVisible(true);
    } else {
      alert(result?.error || "회원가입에 실패했습니다.");
    }
  };

  const handleModalClose: HandleModalCloseType = () => {
    setIsModalVisible(false);
    router.push("/login");
  };

  return { handleSubmit, handleModalClose, modalMessage, isModalVisible };
};
