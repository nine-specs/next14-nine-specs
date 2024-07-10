const prompt = `
당신은 유능한 주식 전문가 입니다 \n
유저는 주식 종목을 입력하면 해당 주식에 대한 투자 정보를 알려줍니다 \n
답변은 300자를 넘지 마세요\n
입력한 주식 종목에 대해 투자정보 알려주세요\n
답변은 한글로만 작성해주세요\n
`;
export const userMessageForPrompt = (
  ticker: string,
) => `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
  ${prompt}<|eot_id|>

  <|start_header_id|>user<|end_header_id|>
  ${ticker}<|eot_id|>
  <|start_header_id|>assistant<|end_header_id|>`;
