import HeadingFont from "@/common/HeadingFont";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import ProfileSVG from "/public/images/profile.svg";
import EditLgIcon from "/public/images/Edit_icon_lg.svg";
import { useEffect, useRef, useState } from "react";
import DropDownB from "./(ProfileEdit)/DropDownB";
import { TUser } from "@/app/api/profile/route";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import BodyFont from "@/common/BodyFont";
import CheckIdNickInput from "@/common/CheckIdNickInput";
import { getStockByKeyword } from "@/hooks/profile/useStocksHandler";
import { useRouter } from "next/navigation";

type TProfileEdit = {
  onClose: () => void;
  profileData: {
    profileData: TUser | undefined;
    setProfileData: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  };
};
export default function ProfileEdit({ onClose, profileData }: TProfileEdit) {
  const profileImgSrc = profileData.profileData?.image;
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  //프로필 아이콘 클릭시 숨겨진 input이 클릭
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(nickInputTag);
    const inputBox = document.getElementById("inputBox");
    console.log(inputBox?.querySelector("input"));
    e.preventDefault();
    // 참조 이상없는지 확인
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // 이미지파일 업로드 시 실행 이벤트
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 업로드 된 파일 가져오기
    const { files } = e.target;
    //선택된 하나의 파일이 존재할 때 file 스테이트에 파일을 저장
    if (files && files.length == 1) {
      const selectedFile = files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validImageTypes.includes(selectedFile.type)) {
        if (selectedFile.size <= 500000) {
          // 500KB 이하로 제한
          setFile(selectedFile);
        } else {
          alert("파일 크기는 500KB 이하로 업로드할 수 있습니다.");
        }
      } else {
        alert("이미지 파일만 업로드할 수 있습니다.");
      }
    }
  };

  const nickInputTag = document.getElementsByName("nick");

  // 수정하기 입력시 모달 안닫아지는 현상 방지
  const onUpdateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setTimeout(() => {
      onClose();
    }, 1000);

    // router.push("/mypage/profile");
  };

  const onTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation;
  };

  return (
    <>
      <Modal size="S5" onClose={onClose}>
        <form
          action={useUpdateProfile}
          className="w-full h-full py-[80px] px-[102px] "
        >
          <div className="w-auto h-auto flex flex-col justify-center items-center">
            <HeadingFont level="3" weight="bold" className="text-primary-900">
              프로필 수정
            </HeadingFont>
            <div className=" w-[386px] h-[328px]  mt-[40px] mb-[56px] flex flex-col justify-center items-center">
              <div className="w-[120px] h-[120px] mb-[24px] relative flex justify-center items-center">
                <button onClick={handleClick}>
                  {/* DB에 저장한 이미지파일을 프사로 표시 */}
                  {file ? ( //업로드한 파일있다면 미리보기 표시
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : profileImgSrc ? (
                    <img
                      src={profileImgSrc} //db에 저장된 이미지 표시
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProfileSVG /> // 업로드, 저장된 파일이 없다면 기본프사 표시
                  )}
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
              <div
                className="w-[384px] h-[184px] flex flex-col gap-[16px] justify-between"
                id="inputBox"
                onClick={(e) => e.stopPropagation()} // 버블링 막기
              >
                {/* 닉네임 수정 */}
                <CheckIdNickInput
                  label="닉네임"
                  name="nick"
                  checkLabel="중복 확인"
                  placeholder={profileData.profileData?.nick}
                  description=" "
                />
                <input
                  className="hidden"
                  name="previousNick"
                  value={profileData.profileData?.nick}
                />
                {/* 닉네임 수정 끝*/}
                {/* 관심종목 */}
                <DropDownB />
                {/* 관심종목 끝 */}
              </div>
            </div>
            <div onClick={onUpdateClick} className="w-full">
              <TextButton variant="primary" size="lg">
                수정하기
              </TextButton>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
