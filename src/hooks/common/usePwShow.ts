import { useState } from "react";

export function usePwShow() {
  const [isPasswordShow, setPasswordShow] = useState(false); // 이미지 숨김 상태
  // 이미지 값에 따라 보여주고 안보여주고 동작
  const togglePasswordShow = () => {
    setPasswordShow(!isPasswordShow);
  };

  return { isPasswordShow, togglePasswordShow };
}
