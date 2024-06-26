/**
 * llama3 의 토큰을 받아오는 함수
 * userid ,password ,url env에서 관리 할 것 같아 인자값으로 안 받는게 좋을 듯
 * @returns {string} - access_token 반환 토큰
 */
export const gptTokenApi = async (): Promise<string> => {
  const USER_ID = process.env.NEXT_PUBLIC_USER_ID || ""; // 나중에 env로 빼기
  const PASSWORD = process.env.NEXT_PUBLIC_USER_PW || ""; // 나중에 env로 빼기
  const URL = process.env.NEXT_PUBLIC_GPT_TOKEN_URL || ""; // 나중에 env로 빼기

  const formData = new FormData();
  formData.append("username", USER_ID);
  formData.append("password", PASSWORD);

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: formData,
      cache: "no-cache",
    });
    //  캐시 옵션에 대한 고민이 필요함
    // no-cache 값은 대부분의 브라우저에서 max-age=0 과 동일한 뜻을 가집니다. 즉, 캐시는 저장하지만 사용하려고 할 때마다 서버에 재검증 요청을 보내야 합니다.

    // no-store 값은 캐시를 절대로 해서는 안 되는 리소스일 때 사용합니다. 캐시를 만들어서 저장조차 하지 말라는 가장 강력한 Cache-Control 값입니다. no-store를 사용하면 브라우저는 어떤 경우에도 캐시 저장소에 해당 리소스를 저장하지 않습니다.
    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    const tokenData = await response.json();
    return tokenData.access_token;
  } catch (error) {
    throw new Error("HTTP Error: " + error);
  }
};
