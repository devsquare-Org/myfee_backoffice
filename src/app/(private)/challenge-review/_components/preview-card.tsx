"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  BadgeCheck,
  ChevronRight,
  FileText,
  MessageCircle,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PreviewCard() {
  const searchParams = useSearchParams();
  const [reviewItemId, setReviewItemId] = useState(
    searchParams.get("reviewItemId")?.toString() || ""
  );

  useEffect(() => {
    setReviewItemId(searchParams.get("reviewItemId")?.toString() || "");
  }, [searchParams]);

  return (
    <div className="flex flex-col bg-border h-full">
      {!reviewItemId ? (
        <EmptyPreviewCard />
      ) : (
        <>
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-background">
            <p className="text-xs font-semibold">
              일주일에 헬스장 2번 가기 챌린지
            </p>
            <div className="flex items-center gap-2">
              <Button variant="destructive" size="sm">
                반려
              </Button>
              <Button variant="default" size="sm">
                승인
              </Button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div
              className="
            max-w-[320px] mx-auto shadow-[0_0_10px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)] rounded-xl bg-background max-h-[610px] overflow-y-auto
          "
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-[10px]">
                    <p className="font-semibold">nickname</p>
                    <p>createdAt</p>
                  </div>
                </div>
                <SquareArrowOutUpRight size={16} />
              </div>
              <div>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=375&h=375&fit=crop"
                  alt="preview"
                  width={375}
                  height={375}
                />
                <div className="bg-[#046A63] px-4 py-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <BadgeCheck />
                    <p className="text-sm font-semibold">title</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="py-3 px-4">
                  <p className="text-xs leading-[1.2]">content</p>
                  <div className="flex items-center gap-1 mt-2">
                    <MessageCircle
                      size={14}
                      className="text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground">
                      첫번째 댓글을 남겨보세요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function EmptyPreviewCard() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4 text-center">
        <FileText
          strokeWidth={1.5}
          size={48}
          className="text-muted-foreground opacity-50"
        />
        <p className="text-sm text-muted-foreground">
          목록에서 리뷰를 선택해주세요.
        </p>
      </div>
    </div>
  );
}
