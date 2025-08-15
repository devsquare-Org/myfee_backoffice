import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomAlert } from "@/components/custom-alert";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

type SendDialogProps = {
  title: string;
  content: string;
  isAd: boolean;
  loading: boolean;
  disabled: boolean;
  onValidate: () => Promise<boolean>;
  setIsSubmit: (isSubmit: boolean) => void;
};
export default function SendDialog({
  title,
  content,
  isAd,
  loading,
  disabled,
  onValidate,
  setIsSubmit,
}: SendDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSend() {
    setIsSubmit(true);
    setIsOpen(false);
  }

  function handleCancel() {
    setIsSubmit(false);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        disabled={loading || disabled}
        onClick={async () => {
          if (await onValidate()) setIsOpen(true);
        }}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : "푸시 알림 발송"}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>푸시 알림 발송</DialogTitle>
        </DialogHeader>
        <CustomAlert type="simple" title="발송 전 내용을 다시 확인해주세요." />
        <Label>제목</Label>
        <Input value={title} disabled />
        <Label>내용</Label>
        <Input value={content} disabled />
        <Label>광고 알림 여부</Label>
        <Input value={isAd ? "광고" : "일반"} disabled />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            className="w-full"
            type="button"
            variant="default"
            onClick={handleSend}
          >
            발송
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
