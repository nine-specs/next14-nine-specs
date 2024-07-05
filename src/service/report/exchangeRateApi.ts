/**
 * 현재 환율 정보를 가져오는 API
 * 네이버 금융에서 원 달라 환율 정보를 가져옵니다. 하나은행 데이터를 사용합니다.
 * @returns {number} - 환율 반환
 *  달라 원화 환율 "1,381.00"
 */
export const getExchangeRate = async () => {
  const res = await fetch(
    `http://m.stock.naver.com/front-api/marketIndex/productDetail?category=exchange&reutersCode=FX_USDKRW`,
  );
  const data = await res.json();
  // 해당 json 형식에서 result.calcPrice 값을 가져옴
  return data.result.calcPrice;
};
