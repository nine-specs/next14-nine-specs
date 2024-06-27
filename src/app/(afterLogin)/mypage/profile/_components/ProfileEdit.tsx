import CheckIdInput from "@/common/CheckIdInput";
import HeadingFont from "@/common/HeadingFont";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import ProfileSVG from "/public/images/profile.svg";
import EditLgIcon from "/public/images/Edit_icon_lg.svg";
import Input from "@/common/Input";
import { useRef, useState } from "react";

interface TProfileEdit {
  onClose: () => void;
}
export default function ProfileEdit({ onClose }: TProfileEdit) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  //프로필 아이콘 클릭시 숨겨진 input이 클릭
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 참조 이상없는지 확인
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // 파일 업로드 시 이벤트 실행됨
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 업로드 된 파일 가져오기
    const { files } = e.target;
    //선택된 하나의 파일이 존재할 때 file 스테이트에 파일을 저장
    if (files && files.length == 1) {
      const selectedFile = files[0];
      // 이미지 파일 타입 검사
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setError(""); // 오류 메시지 초기화
      } else {
        setError("이미지 파일만 업로드할 수 있습니다.");
      }
    }
  };

  return (
    <>
      <Modal size="S5" onClose={onClose}>
        <form className="w-full h-full py-[80px] px-[102px] ">
          <div className="w-auto h-auto flex flex-col justify-center items-center">
            <HeadingFont level="3" weight="bold" className="text-primary-900">
              프로필 수정
            </HeadingFont>
            <div className=" w-[386px] h-[328px]  mt-[40px] mb-[56px] flex flex-col justify-center items-center">
              <div className="w-[120px] h-[120px] mb-[24px] relative flex justify-center items-center">
                <button onClick={handleClick}>
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProfileSVG />
                  )}

                  {/* <ProfileSVG /> */}
                  <EditLgIcon className="absolute bottom-0 right-0 " />
                </button>
                {/* 숨긴 파일타입 input  */}
                <input
                  type="file"
                  className="hidden" // display:none 적용
                  name="file"
                  ref={fileInputRef} //ref로 참조
                  onChange={onFileChange} // 업로드된 파일 state 보관
                ></input>
              </div>
              <div className="w-[384px] h-[184px] flex flex-col gap-[16px] justify-between">
                <CheckIdInput
                  label="닉네임"
                  checkLabel="중복확인"
                  placeholder="김스낵"
                />
                <Input label="관심종목" placeholder="#테슬라 #애플 #코카콜라" />
              </div>
            </div>
            <TextButton variant="primary" size="lg">
              수정하기
            </TextButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
