"use server";

import { hash } from "bcrypt";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const userData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: formData.get("userId") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    phone: formData.get("phone") as string,
    birthdate: formData.get("birthdate") as string,
  };

  const { name, userId, email, password, confirmPassword, phone, birthdate } =
    userData;

  // 입력값 및 유효성 검사
  const missingFields = [];

  if (!name) {
    missingFields.push("이름을 입력해주세요");
    console.log(`${missingFields.join("\n")}`);
    return;
  }

  if (!email) {
    missingFields.push("이메일을 입력해주세요");
    console.log(`${missingFields.join("\n")}`);
    return;
  }

  if (!userId) {
    missingFields.push("아이디를 입력해주세요");
    console.log(`${missingFields.join("\n")}`);
    return;
  } else {
    // 아이디 유효성 검사 (6~12자의 영문, 숫자, _의 조합)
    const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_]{6,12}$/;
    if (!userIdRegex.test(userId)) {
      missingFields.push(
        "아이디는 6~12자의 영문, 숫자, _의 조합이어야 합니다.",
      );
      console.log(`${missingFields.join("\n")}`);
      return;
    }
  }

  if (!password) {
    missingFields.push("비밀번호를 입력해주세요");
    console.log(`${missingFields.join("\n")}`);
    return;
  } else {
    //비밀번호 유효성 검사 (~20자 이내 숫자, 특수문자, 영문자 중 2가지 이상 조합, @ $ 제외)
    // 비밀번호 입력하기 귀찮아서 일단 6월26일 정규식 제외 함
    /*
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^@$A-Za-z\d])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      missingFields.push(
        "비밀번호는 20자 이내의 숫자, 특수문자(단 @, $ 제외), 영문자 중 2가지 이상 조합이어야 합니다.",
      );
      console.log(`${missingFields.join("\n")}`);
      return;
    }
      */
  }

  if (!confirmPassword) {
    missingFields.push("비밀번호 확인하는 곳을 입력해주세요");
    console.log(`${missingFields.join("\n")}`);
    return;
  } else if (password && password !== confirmPassword) {
    missingFields.push("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    console.log(`${missingFields.join("\n")}`);
    return;
  }

  const phoneRegex = /^\d{11}$/;

  if (!phone || !phoneRegex.test(phone)) {
    if (!phone) {
      missingFields.push("핸드폰 번호를 입력해주세요.");
    } else {
      console.log("핸드폰 번호는 숫자로 이루어진 11자리여야 합니다.");
    }
    console.log(`${missingFields.join("\n")}`);
    return;
  }

  const birthdateRegex = /^\d{6}$/;

  if (!birthdate || !birthdateRegex.test(birthdate)) {
    if (!birthdate) {
      missingFields.push("생년 월일을 입력해주세요.");
    } else {
      console.log("생년 월일은 6자리 숫자로 입력해주세요.");
    }
    console.log(`${missingFields.join("\n")}`);
    return;
  }

  try {
    // 파이어베이스에서 userId를 기준으로 회원 조회
    const querySnapshot = await getDocs(collection(firestore, "users"));
    const existingUsers = querySnapshot.docs.map((doc) => doc.data().userId);

    if (existingUsers.includes(userId)) {
      console.log("이미 존재하는 userId입니다.");
      return;
    }

    // 없는 회원 이면 파이어베이스에 회원 정보 추가
    const createdAt = new Date(); // 현재 날짜와 시간 가져오기
    const hashedPassword = await hash(String(password), 10);
    await addDoc(collection(firestore, "users"), {
      name: name,
      userId: userId,
      password: hashedPassword,
      phone: phone,
      birthdate: birthdate,
      email: email,
      createdAt: createdAt,
      accountType: "A", //일반회원가입
    });
    console.log("회원 가입 성공!");
    return { success: true };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: "회원가입에 실패했습니다." };
  }
  // finally {
  //   redirect("/login");
  // }
}
