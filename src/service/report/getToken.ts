/**
 * llama3 의 토큰을 받아오는 함수
 * @returns {string} - access_token 반환 토큰
 */
export const getToken = async (): Promise<string> => {
  const USER_ID = "sfacspace_4"; // 나중에 env로 빼기
  const PASSWORD = "Bwl9SrmXHt2x"; // 나중에 env로 빼기
  const URL = "http://43.203.238.76:8000/auth/token"; // 나중에 env로 빼기

  const formData = new FormData();
  formData.append("username", USER_ID);
  formData.append("password", PASSWORD);

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    throw new Error("HTTP Error: " + error);
  }
};
