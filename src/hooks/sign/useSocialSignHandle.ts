import { useState } from "react";
import { useRouter } from "next/navigation";
import { SocialSignUp } from "@/hooks/sign/useSocialSign";

interface UseSocialSignHandleProps {
  userInfo: {
    id: string;
    name: string;
    email: string;
    image: string;
    provider: string;
  } | null;
  nick: string;
  myStockArr: string[];
  file: File | null;
}

export const useSocialSignHandle = ({
  userInfo,
  nick,
  myStockArr,
  file,
}: UseSocialSignHandleProps) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInfo) {
      const formData = {
        nick,
        phone: e.currentTarget.phone.value,
        birthdate: e.currentTarget.birthdate.value,
        stocks: myStockArr,
        file,
      };

      const response = await SocialSignUp(userInfo, formData);

      if (response.success) {
        setShowModal(true);
      } else {
        alert(response);
      }
    }
  };

  return {
    showModal,
    handleModalClose,
    handleSubmit,
  };
};
