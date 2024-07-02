import { useState } from "react";
import { registeredId } from "../../hooks/search/useSearchId";

interface SearchResult {
  userId: string;
  createdAt: string;
}

interface RegisteredIdResultSuccess {
  success: true;
  userData: {
    userId: string;
    createdAt: string;
  };
}

interface RegisteredIdResultFailure {
  success: false;
  message: string;
}

type RegisteredIdResult = RegisteredIdResultSuccess | RegisteredIdResultFailure;

export default function useSearchHandle() {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    userId: "",
    createdAt: "",
  });
  const [showSearchedId, setShowSearchedId] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    try {
      const result = (await registeredId(formData)) as RegisteredIdResult;

      if (result.success) {
        setSearchResult({
          userId: result.userData.userId || "",
          createdAt: result.userData.createdAt || "",
        });
      } else {
        console.log(result.message);
        setSearchResult({
          userId: "",
          createdAt: "",
        });
      }
      setShowSearchedId(true); // 검색 결과를 보여주도록 상태 업데이트
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  return {
    searchResult,
    showSearchedId,
    name,
    setName,
    phone,
    setPhone,
    handleSubmit,
  };
}
