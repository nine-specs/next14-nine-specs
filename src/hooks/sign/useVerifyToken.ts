import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useVerifyToken = (token: string | null) => {
  const router = useRouter();
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/error"); // 토큰이 없으면 에러 페이지로 리다이렉트
      return;
    }

    fetch(`/api/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setIsTokenValid(true);
        } else {
          router.push("/error"); // 토큰이 유효하지 않으면 에러 페이지로 리다이렉트
        }
      })
      .catch((error) => {
        console.error("토큰 검증 중 오류 발생:", error);
        router.push("/error"); // 검증 중 오류 발생 시 에러 페이지로 리다이렉트
      });
  }, [token, router]);

  return { isTokenValid };
};

export default useVerifyToken;
