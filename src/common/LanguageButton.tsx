import React, { Dispatch, SetStateAction } from "react";
import UsaImg from "../../public/images/country/USA.svg";
import ChImg from "../../public/images/country/CHINA.svg";
import JpImg from "../../public/images/country/JP.svg";
import FrImg from "../../public/images/country/FRANCE.svg";
import BodyFont from "./BodyFont";
import { updateLang } from "@/hooks/profile/useUpdateProfile";

type LanguageBTNProps = {
  country: "USA" | "JP" | "CH" | "FR";
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
};
/**props로 전달된 국가의 svg파일과 언어이름을 포함하는 객체 */
const countryObj = {
  USA: { langImg: <UsaImg />, langText: "영어" },
  CH: { langImg: <ChImg />, langText: "중국어" },
  JP: { langImg: <JpImg />, langText: "일본어" },
  FR: { langImg: <FrImg />, langText: "프랑스어" },
};

export const LanguageButton = ({
  country,
  lang,
  setLang,
}: LanguageBTNProps) => {
  /**현재 languageButton이 나타내는 언어 */
  const language = countryObj[country];

  // 기본컬러
  let styleColor = `grayscale-300`;
  // db의 설정언어와 현재 컴포넌트 언어가 동일할 시 색상변경
  if (country == lang) {
    styleColor = `secondary-600`;
  }

  async function onClick(e: React.MouseEvent<HTMLDivElement>) {
    await updateLang(country);
    setLang(country);
  }

  return (
    <div
      className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[160px] w-[198px] rounded-2xl border border-${styleColor}`}
      onClick={onClick}
    >
      <div className="flex-grow-0 flex-shrink-0 w-[72px] h-[72.32px] relative">
        {language.langImg}
      </div>
      <BodyFont
        level="3"
        weight="bold"
        className={`flex-grow-0 flex-shrink-0 text-lg font-bold text-center text-${styleColor}`}
      >
        {language.langText}
      </BodyFont>
    </div>
  );
};
