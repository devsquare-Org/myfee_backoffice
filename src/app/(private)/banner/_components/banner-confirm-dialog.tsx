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
import Image from "next/image";

type CreateDialogProps = {
  title: string;
  link: string;
  loading: boolean;
  disabled: boolean;
  previewUrl: string;
  onValidate: () => Promise<boolean>;
  setIsSubmit: (isSubmit: boolean) => void;
  mode?: "create" | "edit";
};
export default function BannerConfirmDialog({
  title,
  link,
  previewUrl,
  loading,
  disabled,
  onValidate,
  setIsSubmit,
  mode = "create",
}: CreateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isEdit = mode === "edit";
  const buttonText = isEdit ? "배너 수정" : "배너 추가";
  const dialogTitle = isEdit ? "배너 수정" : "배너 추가";
  const alertTitle = isEdit
    ? "배너 수정 전 내용을 다시 확인해주세요."
    : "배너 추가 전 내용을 다시 확인해주세요.";
  const submitButtonText = isEdit ? "수정" : "추가";

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
        {loading ? <LoaderCircle className="animate-spin" /> : buttonText}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <CustomAlert type="simple" title={alertTitle} />
        <Label>제목</Label>
        <Input value={title} disabled />
        <Label>링크</Label>
        <Input value={link} disabled />
        <Label>이미지</Label>
        <Image
          className="w-full aspect-[4/3] object-cover rounded-md"
          src={previewUrl!}
          alt="배너 이미지"
          width={100}
          height={100}
        />
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
            {submitButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
