import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ClipboardUrlPreview({
  url,
  onApply,
  onDismiss,
}: {
  url: string;
  onApply: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="flex items-center gap-2 p-2 bg-muted/80 rounded-md border border-dashed">
      <div className="flex-1 min-w-0 pl-2">
        <p className="text-xs text-muted-foreground">
          클립보드에서 발견한 링크
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          <Link href={url} target="_blank" className="hover:underline">
            {url}
          </Link>
        </p>
      </div>
      <div className="flex gap-1">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onApply}
          className="h-7 px-2 text-xs"
        >
          사용
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onDismiss}
          className="h-7 w-7 p-0"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
