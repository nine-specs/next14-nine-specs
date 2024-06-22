import React from "react";

type TCountry = "USA" | "JP" | "CH" | "FR";
type LanguageBTNProps = {
  country: TCountry;
};
export const LanguageButton: React.FC<LanguageBTNProps> = ({ country }) => {
  return <div>언어버튼</div>;
};
