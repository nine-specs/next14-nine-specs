import ButtonFont from "@/common/ButtonFont";
import CheckIdInput from "@/common/CheckIdInput";
import HeadingFont from "@/common/HeadingFont";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import ProfileSVG from "/public/images/profile.svg";
import EditLgIcon from "/public/images/Edit_icon_lg.svg";
import EditIcon from "/public/images/Edit_icon.svg";
import Input from "@/common/Input";

interface TProfileEdit {
  onClose: () => void;
}

export default function ProfileEdit({ onClose }: TProfileEdit) {
  return (
    <>
      <Modal size="S5" onClose={onClose}>
        <div className="w-full h-full py-[80px] px-[102px] ">
          <div className="w-auto h-auto flex flex-col justify-center items-center">
            <HeadingFont level="3" weight="bold" className="text-primary-900">
              프로필 수정
            </HeadingFont>
            <div className=" w-[386px] h-[328px]  mt-[40px] mb-[56px] flex flex-col justify-center items-center">
              <div className="w-[120px] h-[120px] mb-[24px] relative flex justify-center items-center">
                <ProfileSVG />
                <EditLgIcon className="absolute bottom-0 right-0 " />
              </div>
              <div className="w-[384px] h-[184px] flex flex-col gap-[16px] justify-between">
                <CheckIdInput
                  label="닉네임"
                  checkLabel="중복확인"
                  value="김스낵1"
                />
                <Input label="관심종목" value="#테슬라 #애플 #코카콜라" />
              </div>
            </div>
            <TextButton variant="primary" size="lg">
              수정하기
            </TextButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
