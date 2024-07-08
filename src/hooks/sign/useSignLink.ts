import { useState } from "react";
import { useRouter } from "next/navigation";

type HandleSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleModalCloseType = () => void;

export const useSignLink = (): {
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
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();
      if (response.ok) {
        setModalMessage(result.message || "인증메일이 전송되었습니다.");
        setIsModalVisible(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setModalMessage("이메일 발송에 실패했습니다.");
      setIsModalVisible(true);
    }
  };

  const handleModalClose: HandleModalCloseType = () => {
    setIsModalVisible(false);
    // router.push("/login");
  };

  return { handleSubmit, handleModalClose, modalMessage, isModalVisible };
};
