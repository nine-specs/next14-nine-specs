export async function GET() {
  const USER_ID = process.env.LLAMA_USER_ID as string;
  const USER_PW = process.env.LLAMA_USER_PW as string;
  const LLAMA_TOKEN_URL = process.env.LLAMA_TOKEN_URL as string;

  const USER_DATA = new URLSearchParams();
  USER_DATA.append("username", USER_ID);
  USER_DATA.append("password", USER_PW);

  const response = await fetch(LLAMA_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: USER_DATA.toString(),
  });

  const result = await response.json();

  return Response.json(result.access_token);
}
