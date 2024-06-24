import BodyFont from "@/common/BodyFont";
import Input from "@/common/Input";
import TextButton from "@/common/TextButton";

export default function SearchId() {
  return (
    <>
      <section
        className=" flex flex-row items-center justify-center h-screen py-0 px-5 box-border 
      "
      >
        <form className="flex flex-col items-center justify-start m-0 w-[590px] h-[668px]shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0  py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border ">
          <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
            {/* 타이블 영역 시작  */}
            <BodyFont level="1" weight="bold" className="text-primary-900">
              아이디 찾기
            </BodyFont>
            {/* 타이블 영역 끝 */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              {/* 아이디 입력 하는곳 시작 */}
              <Input placeholder="이름을 입력해주세요" label="이름" />
              {/* 아이디 입력 하는곳 끝 */}

              {/* 전화번호 입력 하는곳 시작 */}
              <Input placeholder="전화번호를 입력해주세요"label="휴대폰 번호" />
              {/* 전화번호 입력 하는곳 끝 */}
            </div>
          </div>

          {/* 로그인 버튼이랑 회원가입 버튼 시작 */}
          <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
            <TextButton disabled type="submit">
              아이디 찾기
            </TextButton>
          </div>
        </form>
      </section>
    </>
  );
}
