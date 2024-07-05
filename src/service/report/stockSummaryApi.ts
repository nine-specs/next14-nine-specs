/**
 * 주식 요약을 가져오는 API
 * 네이버 주식 API를 사용하여 주식 요약을 가져온다.
 * @param stockCode 주식 코드
 * @returns 주식 요약
 * 예시 : 마이크로소프트는 기술 회사다. 이 회사는 소프트웨어, 서비스, 디바이스, 솔루션을 개발하고 지원한다.<br>사업 부문은 Productivity & Business Process, Intelligent Cloud
 */
export const getStockSummary = async (stockCode: string): Promise<string> => {
  const response = await fetch(
    `https://api.stock.naver.com/stock/${stockCode}/overview`,
  );
  const data = await response.json();
  return data.summary;
};

/**
 {
    "companyName": "마이크로소프트",
    "companyNameEng": "Microsoft Corp",
    "summary": "마이크로소프트는 기술 회사다. 이 회사는 소프트웨어, 서비스, 디바이스, 솔루션을 개발하고 지원한다.<br>사업 부문은 Productivity & Business Process, Intelligent Cloud, More Personal Computing으로 구성된다.<br><br>Productivity & Business Process 부문은 생산성, 커뮤니케이션, 정보 서비스 포트폴리오의 제품 및 서비스로 구성된다.<br>이 부문은 주로 Office 상업용, Office 소비자, LinkedIn 및 Dynamics 비즈니스 솔루션으로 구성된다.<br><br>Intelligent Cloud 부문은 (1) Azure 및 기타 클라우드 서비스, SQL Server, Windows Server, Visual Studio, System Center 및 관련 Client Access Licenses(CAL), Nuance 및 GitHub를 포함한 서버 제품 및 클라우드 서비스와 (2) 엔터프라이즈 지원 서비스, 산업 솔루션 및 Nuance 전문 서비스를 포함한 엔터프라이즈 서비스로 구성된다.<br>More Personal Computing 부문은 주로 Windows, 디바이스, 게임, 검색 및 뉴스 광고로 구성된다.",
 */
