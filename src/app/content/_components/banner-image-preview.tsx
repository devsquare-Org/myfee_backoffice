import Image from "next/image";
import { X } from "lucide-react";

export default function BannerImagePreview({
  previewUrl,
  handleRemoveImage,
}: {
  previewUrl: string;
  handleRemoveImage: () => void;
}) {
  return (
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
  );
}
