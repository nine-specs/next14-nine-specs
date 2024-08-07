"use client";

import { useEffect, useState } from "react";
import BodyFont from "@/common/BodyFont";
import HeadingFont from "@/common/HeadingFont";
import TextButton from "@/common/TextButton";
import CHECK_ICON from "../../../../../../public/images/Check_icon.svg";
import Link from "next/link";

export default function Agreement() {
  const [allCheck, setAllCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);

  useEffect(() => {
    if (!allCheck) {
      setServiceCheck(false);
      setPrivacyCheck(false);
    } else {
      setServiceCheck(true);
      setPrivacyCheck(true);
    }
  }, [allCheck]);

  useEffect(() => {
    if (serviceCheck && privacyCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [serviceCheck, privacyCheck]);

  const checkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <main className="w-[616px] mx-auto my-[120px] bg-white py-[80px] px-[102px] rounded-[32px]">
        <HeadingFont
          level="3"
          weight="bold"
          className="text-primary-900 text-center mb-[24px]"
        >
          약관동의
        </HeadingFont>
        <form onSubmit={checkSubmit}>
          <div className="flex flex-col gap-4 mb-[56px]">
            <label className="flex justify-between" htmlFor="allCheck">
              <BodyFont
                level="3"
                weight="regular"
                className="text-grayscale-900"
              >
                이용약관, 개인정보 처리방침에 모두 동의합니다.
              </BodyFont>
              <input
                type="checkbox"
                id="allCheck"
                className="peer hidden"
                checked={allCheck}
                onChange={() => setAllCheck((prevCheck) => !prevCheck)}
              />
              <span className="w-6 h-6 border flex justify-center items-center border-grayscale-400 rounded-full peer-checked:bg-primary-900 peer-checked:border-current">
                <CHECK_ICON />
              </span>
            </label>

            <hr className="border-none h-[1px] bg-grayscale-300" />

            <section className="flex flex-col gap-2">
              <BodyFont
                level="3"
                weight="regular"
                className="text-grayscale-900"
              >
                서비스 이용약관(필수)
              </BodyFont>
              <div className="border border-grayscale-300 rounded-lg p-4">
                <div className="h-[192px] overflow-y-scroll no-scrollbar">
                  {TermsOfServiceConsent}
                </div>
              </div>
              <label
                htmlFor="serviceCheck"
                className="flex justify-end gap-[2px]"
              >
                <BodyFont
                  level="4"
                  weight="regular"
                  className="text-grayscale-900"
                >
                  동의합니다.
                </BodyFont>
                <input
                  type="checkbox"
                  id="serviceCheck"
                  className="peer hidden"
                  checked={serviceCheck}
                  onChange={() => setServiceCheck((prevCheck) => !prevCheck)}
                />
                <span className="w-6 h-6 border flex justify-center items-center border-grayscale-400 rounded-full peer-checked:bg-primary-900 peer-checked:border-current">
                  <CHECK_ICON />
                </span>
              </label>
            </section>

            <section className="flex flex-col gap-2">
              <BodyFont
                level="3"
                weight="regular"
                className="text-grayscale-900"
              >
                개인정보 처리방침(필수)
              </BodyFont>
              <div className="border border-grayscale-300 rounded-lg p-4">
                <div className="h-[192px] overflow-y-scroll no-scrollbar">
                  {PrivacyPolicyConsent}
                </div>
              </div>
              <label
                htmlFor="privacyCheck"
                className="flex justify-end gap-[2px]"
              >
                <BodyFont
                  level="4"
                  weight="regular"
                  className="text-grayscale-900"
                >
                  동의합니다.
                </BodyFont>
                <input
                  type="checkbox"
                  id="privacyCheck"
                  className="peer hidden"
                  checked={privacyCheck}
                  onChange={() => setPrivacyCheck((prevCheck) => !prevCheck)}
                />
                <span className="w-6 h-6 border flex justify-center items-center border-grayscale-400 rounded-full peer-checked:bg-primary-900 peer-checked:border-current">
                  <CHECK_ICON />
                </span>
              </label>
            </section>
          </div>
          <Link href="/signLink">
            <TextButton
              variant="primary"
              disabled={!serviceCheck || !privacyCheck}
            >
              다음
            </TextButton>
          </Link>
        </form>
      </main>
    </>
  );
}

const TermsOfServiceConsent = `아잇나우 서비스 이용약관

본 약관은 (주)스팩스페이스(이하 "회사"라 함)와 이용자 간의 서비스 이용에 관한 규정을 명시합니다. 서비스를 이용함으로써 이 약관에 동의한 것으로 간주됩니다. 본 약관은 회사의 서비스 제공과 관련하여 이용자와 회사 간의 권리, 의무 및 책임사항을 규정하고 있습니다.

제1조 목적

본 약관은 (주)스팩스페이스가 제공하는 AI 애널리스트 플랫폼 스팩애널리스트 서비스(이하 "서비스"라 함)를 이용함에 있어 이용자와 회사 간의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.

제2조 용어의 정의

"서비스"라 함은 (주)스팩스페이스가 제공하는 AI 애널리스트 플랫폼 스팩애널리스트 서비스를 말합니다.
"이용자"라 함은 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.
"회원"이라 함은 서비스에 가입하여 회사가 제공하는 서비스를 이용하는 자를 말합니다.
"사이트"라 함은 (주)스팩스페이스가 서비스를 제공하기 위해 운영하는 웹사이트를 말합니다.
제3조 약관의 효력과 개정

본 약관은 이용자가 서비스를 이용함에 있어 회사와의 권리 의무 관계를 규정합니다.
본 약관은 회사가 운영하는 사이트에 게시함으로써 효력을 발생합니다.
회사는 필요한 경우 본 약관을 개정할 수 있으며, 약관이 변경된 경우에는 적용일자 및 변경사항을 사이트에 게시합니다. 변경된 약관은 게시 즉시 효력을 발생합니다.
제4조 서비스의 제공 및 이용

회사는 이용자에게 실시간 기업 공시 정보와 데일리 4만건의 뉴스 데이터 분석 자료를 결합하여 제공하는 스팩AI 애널리스트 서비스를 제공합니다.
서비스 이용을 위해서는 회원 가입이 필요합니다. 회원 가입 시에는 회사가 요청하는 정보를 제공하여야 하며, 제공한 정보는 항상 정확하고 최신 상태를 유지하여야 합니다.
회사는 이용자의 개인정보 보호를 위해 노력하며, 이에 대한 사항은 개인정보 처리방침에 따릅니다.
이용자는 서비스를 이용함에 있어 다음의 사항을 준수하여야 합니다.
타인의 정보 및 개인정보를 부정하게 사용하지 않는다.
서비스를 이용하여 법률, 규정, 이용약관 등을 위반하지 않는다.
서비스의 안전성, 신뢰성 및 효율성을 해치지 않는다.
타인의 명예를 훼손하거나 불이익을 주는 행위를 하지 않는다.
회사는 이용자가 본 약관에 위반하는 행위를 한 경우, 해당 이용자에게 서비스 이용을 제한할 수 있습니다.
제5조 서비스의 변경 및 중단

회사는 서비스의 품질 향상 및 운영상의 필요에 따라 서비스의 일부 또는 전부를 수정, 변경, 중단할 수 있습니다.
서비스의 변경 및 중단에 대해서는 사전에 공지하며, 이로 인해 발생하는 손해에 대해서는 회사는 책임을 지지 않습니다.
제6조 저작권 및 지적재산권

회사가 작성한 서비스에 대한 모든 저작권과 지적재산권은 회사에 귀속됩니다.
이용자는 회사의 사전 동의 없이 서비스에 게시된 정보를 가공, 판매, 복제, 배포할 수 없습니다.
제7조 면책조항

이용자는 서비스를 이용함에 있어 발생한 일체의 손해에 대해 회사는 책임을 지지 않습니다.
회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인 사유로 인해 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임을 면합니다.
제8조 분쟁의 해결

본 약관에 정하지 않은 사항이 발생할 경우 관련 법령과 회사의 내부규정에 따라 해결됩니다.

부칙

본 약관은 2024년 07월 08일부터 시행됩니다.

이용자 여러분께서는 본 약관을 주의 깊게 읽고 서비스를 이용하기 바랍니다. 서비스 이용 시 본 약관에 동의한 것으로 간주됩니다. 앞으로도 더 나은 서비스를 제공하기 위해 최선을 다하겠습니다
`;

const PrivacyPolicyConsent = `개인정보 처리방침

스팩AI애널리스트 개인정보 처리방침
(주)스팩스페이스(이하 "회사"라 함)는 이용자의 개인정보를 중요하게 생각하며, 정보통신망 이용촉진 및 정보보호 등에 관한 법률을 준수하고 있습니다. 본 개인정보 처리방침은 회사가 이용자의 개인정보를 어떻게 수집, 이용, 보호하고 있는지에 대한 내용을 설명합니다.

수집하는 개인정보의 항목 및 수집 방법
수집하는 개인정보의 항목
이용자의 식별 정보(이름, 이메일 주소 등)
서비스 이용과정에서 생성되는 정보(로그 데이터, 쿠키, 세션 정보 등)
개인정보 수집 방법
이용자가 회원 가입 및 서비스 이용 시 자발적으로 제공하는 경우
서비스 이용 과정에서 자동으로 수집되는 경우(쿠키 등)
개인정보의 수집 및 이용 목적회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
서비스 제공 및 운영
회원 관리 및 서비스 제공에 따른 본인 식별, 인증, 연령 확인
서비스 개선 및 신규 서비스 개발
이용자에게 적합한 맞춤형 서비스 제공
개인정보의 보유 및 이용 기간회사는 이용자의 개인정보를 수집 및 이용하는 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령에 의해 보존하여야 하는 경우 해당 법령에 따라 보관할 수 있습니다.
개인정보의 제공 및 위탁회사는 이용자의 개인정보를 제3자에게 제공하거나 위탁하지 않습니다. 다만, 이용자의 동의가 있거나 법령에 의해 요구되는 경우에 한하여 예외적으로 제공될 수 있습니다.
개인정보의 파기개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기의 방법, 기한은 관련 법령에 따라 진행됩니다.
개인정보의 안전성 확보 조치회사는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취하고 있습니다.
개인정보 처리 시스템의 암호화
해킹 등에 대비한 각종 보안 시스템의 설치 및 운영
개인정보 처리 직원의 교육 및 감시
이용자의 권리와 의무이용자는 개인정보에 대한 열람, 정정, 삭제, 처리정지 등의 권리를 보유하고 있습니다. 이와 관련한 요청은 회사의 고객센터를 통해 제출할 수 있습니다.
개인정보 보호책임자회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
성명: 염민호
담당부서: 대표이사
이메일: admin@ymsco.site
부칙

본 개인정보 처리방침은 2024년 07월 08일부터 시행됩니다.

회사는 개인정보 처리방침을 개정하는 경우, 개정된 사항을 공지사항을 통하여 이용자에게 공지할 것입니다.`;
