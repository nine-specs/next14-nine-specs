import { useState } from "react";
import { useRouter } from "next/navigation";
import { registeredPw } from "./useSearchPw";

type HandleSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleModalCloseType = () => void;

export const useSearchPwHandle = (): {
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
    const result = await registeredPw(formData);

    if (result?.success) {
      setModalMessage("임시 비밀번호가 발급되었습니다.");
      setIsModalVisible(true);
    }
  };

  const handleModalClose: HandleModalCloseType = () => {
    setIsModalVisible(false);
    router.push("/login");
  };

  return { handleSubmit, handleModalClose, modalMessage, isModalVisible };
};
