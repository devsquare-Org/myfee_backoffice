import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClipboardUrlProposal({
  setValue,
}: {
  setValue: (
    name: string,
    value: string,
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
      shouldTouch?: boolean;
    }
  ) => void;
}) {
  const [clipboardUrl, setClipboardUrl] = useState<string | null>(null);

  function applyClipboardUrl() {
    if (clipboardUrl) {
      setValue("linkUrl", clipboardUrl, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setClipboardUrl(null);
    }
  }

  useEffect(() => {
    async function checkClipboardOnMount() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clipboardText = await navigator.clipboard.readText();
        const urlPattern = /https:\/\/[^\s]+/g;
        const urls = clipboardText.match(urlPattern);

        if (urls && urls.length > 0) {
          const extractedUrl = urls[0];
          setClipboardUrl(extractedUrl);
        }
      }
    }

    checkClipboardOnMount();
  }, []);
  return (
    <AnimatePresence>
      {clipboardUrl && (
        <motion.div
          layout
          initial={{ opacity: 1, y: 0, height: "auto" }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{
            opacity: 0,
            y: -20,
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 p-2 bg-muted/80 rounded-md border border-dashed">
            <div className="flex-1 min-w-0 pl-2">
              <p className="text-xs text-muted-foreground">
                클립보드에서 발견한 링크
              </p>
              <p className="text-sm font-medium text-muted-foreground break-all">
                <Link
                  href={clipboardUrl}
                  target="_blank"
                  className="hover:underline"
                >
                  {clipboardUrl}
                </Link>
              </p>
            </div>
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={applyClipboardUrl}
                className="h-7 px-2 text-xs"
              >
                사용
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setClipboardUrl(null)}
                className="h-7 w-7 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
