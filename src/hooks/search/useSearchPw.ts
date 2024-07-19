"use server";
import { firestore } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { hash } from "bcryptjs";
import { sendEmail } from "@/lib/nodemailer";

// 임시 비밀번호 생성 함수
function generateTemporaryPassword(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

export async function registeredPw(formData: FormData) {
  const userSearchData = {
    name: formData.get("name") as string,
    userId: formData.get("userId") as string,
    email: formData.get("email") as string,
  };

  const { name, userId, email } = userSearchData;

  // 입력값 및 유효성 검사
  const missingFields = [];
  if (!name) missingFields.push("이름을 입력해주세요");
  if (!userId) missingFields.push("아이디를 입력해주세요");
  const emailValid = /\S+@\S+\.\S+/;
  if (!email) missingFields.push("이메일을 입력해주세요");
  if (!emailValid.test(email)) missingFields.push("유효한 이메일 주소를 입력해주세요");

  if (missingFields.length > 0) {
    console.log(`${missingFields.join("\n")}`);
    return { success: false, message: missingFields.join("\n") };
  }

  try {
    // 파이어베이스에서 name, userId, email 기준으로 회원 조회
    const userQuery = query(
      collection(firestore, "users"),
      where("name", "==", name),
      where("userId", "==", userId),
      where("email", "==", email),
    );
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(firestore, "users", userDoc.id);

      // 임시 비밀번호 생성
      const temporaryPassword = generateTemporaryPassword(7);
      const hashedPassword = await hash(temporaryPassword, 10);

      // Firestore에 암호화된 비밀번호 업데이트
      await updateDoc(userRef, { password: hashedPassword });

      // 이메일 전송
      const emailData = {
        to: email,
        subject: "임시 비밀번호 발급",
        message: `임시 비밀번호는 ${temporaryPassword} 입니다. 로그인 후 비밀번호를 변경해주세요.`,
        link: "",
      };

      try {
        const result = await sendEmail(emailData);
        console.log("Email sent successfully:", result);
        return {
          success: true,
          message: "임시 비밀번호가 이메일로 전송되었습니다.",
        };
      } catch (error) {
        console.error("Error sending email:", error);
        return {
          success: false,
          message: "이메일 전송 중 오류가 발생했습니다.",
        };
      }
    } else {
      // 사용자가 존재하지 않는 경우
      console.log("사용자가 없습니다");
      return { success: false, message: "사용자를 찾을 수 없습니다." };
    }
  } catch (error) {
    console.error("Error searching document: ", error);
    return { success: false, message: "문서 검색 중 오류가 발생했습니다." };
  }
}
