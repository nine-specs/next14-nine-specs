import BodyFont from "@/common/BodyFont";
import HeadingFont from "@/common/HeadingFont";
import Input from "@/common/Input";
import { Modal } from "@/common/Modal";
import TextButton from "@/common/TextButton";
import React, { Dispatch, SetStateAction } from "react";

interface TDeleteAccount {
  onClose: () => void;
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function DeleteAccount({
  onClose,
  setModalHandler,
}: TDeleteAccount) {
  // 드롭다운 옵션 선택시  발생이벤트
  const selectOption = (e: React.MouseEvent<HTMLSpanElement>) => {
    alert("!");
  };

  return (
    <>
      <Modal size="S4" onClose={onClose}>
        <div className="w-full h-full py-[80px] px-[102px] ">
          <div className=" w-[386px] h-[384px] flex flex-col justify-center items-center ">
            <HeadingFont level="3" weight="bold" className="text-primary-900 ">
              회원탈퇴
            </HeadingFont>
            {/*<<--인풋박스-*/}
            <div className=" w-[386px] h-[184px] mt-[40px] mb-[56px]">
              <BodyFont
                level="4"
                weight="medium"
                className="text-primary-900 mb-1"
              >
                회원탈퇴 사유
              </BodyFont>
              <Input value="탈퇴 사유를 선택해주세요"></Input>
              {/* 셀렉트박스 */}
              <div className="flex flex-col justify-center items-start gap-0 z-10 absolute border border-grayscale-300 rounded-lg w-[386px] h-[286px] bg-grayscale-0 mt-1">
                <div className="flex-grow w-full  hover:bg-gray-100 transition duration-50 box-border py-4 pl-4 pr-[56px] ">
                  <div
                    className="w-[314px] h-[24px] cursor-pointer"
                    onClick={selectOption}
                  >
                    <BodyFont
                      level="4"
                      weight="regular"
                      className="text-gray-900"
                    >
                      <span className="m-0 w-0">
                        이용이 불편하고 장애가 많아서
                      </span>
                    </BodyFont>
                  </div>
                </div>
                <div className="flex-grow w-full  hover:bg-gray-100 transition duration-200 box-border py-4 pl-4 pr-[56px] ">
                  <div
                    className="w-[314px] h-[24px] cursor-pointer"
                    onClick={selectOption}
                  >
                    <BodyFont
                      level="4"
                      weight="regular"
                      className="text-gray-900"
                    >
                      <span className="m-0 w-0">다른 서비스가 더 좋아서</span>
                    </BodyFont>
                  </div>
                </div>
                <div className="flex-grow w-full  hover:bg-gray-100 transition duration-200 box-border py-4 pl-4 pr-[56px] ">
                  <div
                    className="w-[314px] h-[24px] cursor-pointer"
                    onClick={selectOption}
                  >
                    <BodyFont
                      level="4"
                      weight="regular"
                      className="text-gray-900"
                    >
                      <span className="m-0 w-0">사용 빈도가 낮아서</span>
                    </BodyFont>
                  </div>
                </div>
                <div className="flex-grow w-full  hover:bg-gray-100 transition duration-200 box-border py-4 pl-4 pr-[56px] ">
                  <div
                    className="w-[314px] h-[24px] cursor-pointer"
                    onClick={selectOption}
                  >
                    <BodyFont
                      level="4"
                      weight="regular"
                      className="text-gray-900"
                    >
                      <span className="m-0 w-0">콘텐츠 불만</span>
                    </BodyFont>
                  </div>
                </div>
                <div className="flex-grow w-full  hover:bg-gray-100 transition duration-200 box-border py-4 pl-4 pr-[56px] ">
                  <div
                    className="w-[314px] h-[24px] cursor-pointer"
                    onClick={selectOption}
                  >
                    <BodyFont
                      level="4"
                      weight="regular"
                      className="text-gray-900"
                    >
                      <span className="m-0 w-0">기타</span>
                    </BodyFont>
                  </div>
                </div>
              </div>
              {/* 셀렉트박스 끝*/}
              <BodyFont
                level="4"
                weight="medium"
                className="text-primary-900 mt-4 mb-1"
              >
                비밀번호 입력
              </BodyFont>
              <Input type="password"></Input>
            </div>
            {/*인풋박스-->>*/}
            <TextButton size="lg" className="!text-grayscale-300" disabled>
              회원탈퇴
            </TextButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
