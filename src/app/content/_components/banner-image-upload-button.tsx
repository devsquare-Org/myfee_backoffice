import { FormItem, FormLabel } from "@/components/ui/form";
import { Upload } from "lucide-react";

export default function BannerImageUploadButton({
  fileInputRef,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <FormItem>
      <FormLabel
        className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer w-full aspect-[4/3] dark:bg-input/30"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-8 h-8 text-muted-foreground" />
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-medium">
            이미지를 선택해주세요
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, GIF (최대 5MB)
          </p>
        </div>
      </FormLabel>
    </FormItem>
  );
}
