import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const generateToken = (email: string): string => {
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "30m" });
  //console.log("이메일을 보낼 때 토큰:", token);
  return token;
};

export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    console.error("토큰 검증 실패:", error);
    return false;
  }
};

export const getEmailFromToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
    return decoded.email || null;
  } catch (error) {
    console.error("토큰에서 이메일 추출 실패:", error);
    return null;
  }
};
