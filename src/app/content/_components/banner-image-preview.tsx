import Image from "next/image";
import { Upload, X } from "lucide-react";
import { FormItem, FormLabel } from "@/components/ui/form";

export default function BannerImagePreview({
  previewUrl,
  handleRemoveImage,
  fileInputRef,
  className,
}: {
  previewUrl: string | null;
  handleRemoveImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  className?: string;
}) {
  return (
    <div className={className}>
      {previewUrl ? (
        <div className="space-y-4">
          <div className="relative w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border">
              <Image
                src={previewUrl}
                alt="배너 미리보기"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-secondary rounded-full p-1 shadow-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
