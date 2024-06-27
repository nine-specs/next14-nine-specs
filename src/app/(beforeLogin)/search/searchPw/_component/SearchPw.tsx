import BodyFont from "@/common/BodyFont";
import Input from "@/common/Input";
import TextButton from "@/common/TextButton";

export default function SearchPw() {
  return (
    <>
      <section
        className=" flex flex-row items-center justify-center py-0 px-5 box-border  my-30
          "
      >
        <form className="flex flex-col items-center justify-start m-0 w-[590px] h-[668px]shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0  py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border ">
          <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
            {/* 타이블 영역 시작  */}
            <BodyFont level="1" weight="bold" className="text-primary-900">
              비밀번호 재발급
            </BodyFont>
            {/* 타이블 영역 끝 */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              {/* 이름 입력 하는곳 시작 */}
              <Input placeholder="이름을 입력해주세요" label="이름" />
              {/* 이름 입력 하는곳 끝 */}

              {/* 이름 입력 하는곳 시작 */}
              <Input placeholder="아이디을 입력해주세요" label="아이디" />
              {/* 이름 입력 하는곳 끝 */}

              {/* 전화번호 입력 하는곳 시작 */}
              <Input
                placeholder="가입 시 입력한 이메일을 입력해주세요"
                label="이메일 주소"
              />
              {/* 전화번호 입력 하는곳 끝 */}
            </div>
          </div>

          {/* 로그인 버튼이랑 회원가입 버튼 시작 */}
          <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
            <TextButton disabled type="submit">
              임시 비밀번호 발급
            </TextButton>
          </div>
        </form>
      </section>
    </>
  );
}
