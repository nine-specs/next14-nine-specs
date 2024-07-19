import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";

export function useNickCheck() {
  const [nick, setNick] = useState("");
  const [styleStatus, setStyleStatus] = useState<
    "default" | "warning" | "success"
  >("default");
  const [descriptionText, setDescriptionText] = useState("");

  const handleNickCheck = async () => {
    if (!nick) {
      setStyleStatus("warning");
      setDescriptionText("닉네임을 입력해주세요.");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const existingNicks = querySnapshot.docs.map((doc) => doc.data().nick);

      if (existingNicks.includes(nick)) {
        setStyleStatus("warning");
        setDescriptionText("중복된 닉네임입니다. 다른 닉네임을 사용해주세요.");
      } else {
        setStyleStatus("success");
        setDescriptionText("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error(
        "파이어베이스에서 문서를 가져오는 중 오류가 발생했습니다:",
        error,
      );
      setStyleStatus("warning");
      setDescriptionText("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return {
    nick,
    setNick,
    styleStatus,
    descriptionText,
    handleNickCheck,
  };
}
