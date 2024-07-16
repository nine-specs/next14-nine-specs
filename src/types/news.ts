/**
 * @interface NewsResponse
 * @description 관련 주식 정보가 포함된 뉴스 기사를 나타냅니다.
 */
export interface NewsResponse {
  /**
   * @property {string} newsId - 뉴스 기사의 고유 식별자
   */
  newsId: string;

  /**
   * @property {string} relatedStocks - 뉴스 기사와 관련된 주식 심볼 문자열
   */
  relatedStocks?: string;

  /**
   * @property {string} headLine - 뉴스 기사의 제목
   */
  headLine: string;

  /**
   * @property {string} contents - 뉴스 기사의 주요 내용
   */
  contents: string;

  /**
   * @property {string} description - 뉴스 기사의 주요 내용 요약
   */
  description: string;

  /**
   * @property {string} image - 뉴스 기사와 관련된 이미지의 URL
   */
  image?: string;

  /**
   * @property {string} creationTime - 뉴스 기사의 게재 시각
   */
  creationTime: string;

  /**
   * @property {string} media - 뉴스 기사의 미디어 출처 (언론사)
   */
  media: string;

  /**
   * @property {string} category - 뉴스 기사의 분류명
   */
  category?: string;
}
