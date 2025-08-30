"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  BadgeCheck,
  Bookmark,
  ChevronRight,
  Heart,
  Loader2,
  MessageCircle,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchChallengeReviewDetail } from "@/app/(private)/challenge-review/_action/data";
import { Skeleton } from "@/components/ui/skeleton";
import { ApprovedDialog } from "@/app/(private)/challenge-review/_components/approved-dialog";
import { motion } from "framer-motion";
import { RejectDialog } from "@/app/(private)/challenge-review/_components/reject-dialog";

type ReviewItem = {
  id: number;
  title: string;
  image: string;
  body: string;
  createdAt: string;
  nickname: string;
  profileImage: string;
};

export function PreviewCard() {
  const searchParams = useSearchParams();
  const [reviewDetail, setReviewDetail] = useState<ReviewItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isApprovedDialogOpen, setIsApprovedDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const reviewItemId = searchParams.get("reviewItemId")?.toString() || "";
  const status = searchParams.get("status")?.toString() || "pending";
  const [isActionExecuting, setIsActionExecuting] = useState(false);

  useEffect(() => {
    async function fetchReviewDetail() {
      if (!reviewItemId) return;

      setIsLoading(true);

      const { data } = await fetchChallengeReviewDetail({
        id: reviewItemId,
      });

      setReviewDetail(data || null);
      setIsLoading(false);
    }

    fetchReviewDetail();
  }, [reviewItemId]);

  if (isLoading) return <ReviewDetailSkeleton />;

  if (!reviewItemId || !reviewDetail) return <EmptyPreviewCard />;

  return (
    <div className="flex flex-col bg-border h-full">
      <>
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-background h-[57px]">
          <p className="text-xs font-semibold">{reviewDetail?.title}</p>
          {status === "pending" && (
            <div className="flex items-center gap-2">
              <RejectDialog
                isActionExecuting={isActionExecuting}
                setIsActionExecuting={setIsActionExecuting}
                reviewId={reviewItemId}
                isOpen={isRejectDialogOpen}
                setIsOpen={setIsRejectDialogOpen}
              />
              <ApprovedDialog
                isActionExecuting={isActionExecuting}
                setIsActionExecuting={setIsActionExecuting}
                reviewId={reviewItemId}
                isOpen={isApprovedDialogOpen}
                setIsOpen={setIsApprovedDialogOpen}
              />
            </div>
          )}
        </div>

        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="
            w-[375px] mx-auto shadow-[0_0_10px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)] rounded-xl bg-background max-h-[564px] overflow-y-auto
          "
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={reviewDetail?.profileImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-[10px]">
                  <p className="font-semibold">{reviewDetail?.nickname}</p>
                  <p>1분 전</p>
                </div>
              </div>
              <SquareArrowOutUpRight size={16} />
            </div>
            <div>
              <div className="relative">
                <Image
                  src={reviewDetail?.image || ""}
                  alt="preview"
                  width={320}
                  height={320}
                  className="aspect-square w-full"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 justify-center bg-primary/50 rounded-full px-2 py-1">
                  <Heart fill="red" stroke="red" className="w-4 h-4" />
                  <p className="text-[13px] text-primary-foreground">1,046</p>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center justify-center bg-primary/50 rounded-full p-2">
                  <Bookmark className="w-4 h-4" fill="white" stroke="white" />
                </div>
              </div>
              <div className="bg-[#046A63] px-4 py-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="min-w-[24px] min-h-[24px]" />
                  <p className="text-sm font-semibold line-clamp-1">
                    {reviewDetail?.title}
                  </p>
                </div>
                <ChevronRight />
              </div>
              <div className="py-3 px-4">
                <p className="text-xs leading-[140%]">{reviewDetail?.body}</p>
                <div className="flex items-center gap-1 mt-2">
                  <MessageCircle size={14} className="text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    첫번째 댓글을 남겨보세요!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </div>
  );
}

function EmptyPreviewCard() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xs text-muted-foreground font-medium">
          표시할 리뷰가 없습니다.
        </p>
      </div>
    </div>
  );
}

function ReviewDetailSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-background h-[57px]">
        <Skeleton className="w-52 h-6" />
        <Skeleton className="w-0 h-6" />
        <Skeleton className="w-0 h-6" />
      </div>
      <div className="flex items-center justify-center h-[calc(100vh-285px)] bg-border">
        <div className="text-sm text-muted-foreground">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    </>
  );
}
