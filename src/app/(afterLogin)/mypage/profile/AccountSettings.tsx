import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";

interface TAccountSetting {
  onClose: () => void;
}

export default function AccountSetting({ onClose }: TAccountSetting) {
  return (
    <>
      <Modal size="S3" onClose={onClose}>
        <form className="w-full h-full py-[80px] px-[102px] ">
          <div className="w-full h-full flex flex-col justify-center items-center ">
            <HeadingFont level="3" weight="bold" className="text-primary-900 ">
              비밀번호 인증
            </HeadingFont>

            <div className="w-[384px] h-[184px] flex flex-col gap-[16px] justify-between mt-[40px] mb-[56]">
              <Input type="password" label="현재 비밀번호입력"></Input>
            </div>
            <TextButton size="lg" className="!text-grayscale-300" disabled>
              확인
            </TextButton>

            {/* 비밀번호 입력 후 disavled 해제 
             <TextButton size="lg" variant="primary">
              확인
            </TextButton> */}
          </div>
        </form>
      </Modal>
    </>
  );
}
