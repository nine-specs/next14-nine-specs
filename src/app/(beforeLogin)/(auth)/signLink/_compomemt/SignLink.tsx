"use client";
import BodyFont from "@/common/BodyFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import { useSignLink } from "@/hooks/sign/useSignLink";

export default function SignLink() {
  const { handleSubmit, handleModalClose, modalMessage, isModalVisible } =
    useSignLink();
  return (
    <>
      <section className="flex flex-row items-center justify-center py-0 px-5 box-border my-[90px]">
        <form className="flex flex-col items-center justify-start m-0 w-[590px] h-[564px] shadow-[0px_0px_10px_5px_rgba(203,_203,_203,_0.25)] rounded-[32px] bg-grayscale-0 py-20 pr-5 pl-[22px] box-border gap-[16px] max-w-full mq725:pt-[52px] mq725:pb-[52px] mq725:box-border" onSubmit={handleSubmit}>
          <div className="w-[386px] flex flex-col items-center justify-start gap-[40px] max-w-full mq450:gap-[20px]">
            <BodyFont level="1" weight="bold" className="text-primary-900">
              본인 인증
            </BodyFont>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              <Input
                placeholder="이름을 입력해주세요"
                label="이름"
                name="name"
              />
              <Input
                placeholder="이메일을 입력해주세요"
                label="이메일"
                name="email"
              />
            </div>
          </div>
          <div className="w-[386px] flex flex-col items-start justify-start max-w-full">
            <TextButton type="submit" variant="primary">
              인증링크 전송
            </TextButton>
          </div>
        </form>
      </section>
      {isModalVisible && (
        <Modal size="S2">
          <div className="flex flex-col items-center justify-start gap-4 p-5 max-w-full">
            <h1 className="text-xl font-bold text-gray-900">{modalMessage}</h1>
            <div className="text-sm text-gray-900 text-center">
              <p>작성하신 이메일 주소로 인증메일을 발송했습니다.</p>
              <p>메일 확인 후 회원가입을 계속 진행해주세요.</p>
            </div>
            <div className="w-full flex justify-center">
              <TextButton variant="primary" onClick={handleModalClose}>
                확인
              </TextButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
