import { Modal } from "@/common/Modal";

interface TAccountSetting {
  onClose: () => void;
}

export default function AccountSetting({ onClose }: TAccountSetting) {
  return (
    <>
      <Modal size="S5" onClose={onClose}>
        <div className="py-[80px] px-[102px] border">
          <div>게쩡수정</div>
        </div>
      </Modal>
    </>
  );
}
