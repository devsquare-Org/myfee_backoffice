"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type Props = {
  reviewList: {
    id: number;
    title: string;
    body: string;
    createdAt: string;
  }[];
};

export function ReviewList({ reviewList }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reviewItemId, setReviewItemId] = useState(
    searchParams.get("reviewItemId")?.toString() || ""
  );
  const [status, setStatus] = useState(
    searchParams.get("status")?.toString() || "pending"
  );

  // 스크롤 리셋용 파라미터들
  const statusParam = searchParams.get("status");
  const pageParam = searchParams.get("page");
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  // reviewItemId 변경 시 변경된 값을 저장
  useEffect(() => {
    setReviewItemId(searchParams.get("reviewItemId")?.toString() || "");
  }, [searchParams, pathname]);

  // status 변경 시 변경된 값을 저장
  useEffect(() => {
    setStatus(searchParams.get("status")?.toString() || "pending");
  }, [searchParams, pathname]);

  // reviewItemId 외 파라미터 변경 시 스크롤 최상단 이동
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [statusParam, pageParam, startDateParam, endDateParam]);

  function selectReviewItem(value: string) {
    setReviewItemId(value);

    const params = new URLSearchParams(searchParams);

    params.set("reviewItemId", value);

    replace(`${pathname}?${params.toString()}`);
  }

  function getStatusColor(status: string) {
    if (status === "pending") return "bg-yellow-500";
    if (status === "approved") return "bg-blue-500";
    if (status === "rejected") return "bg-red-500";
  }

  function getStatusText(status: string) {
    if (status === "pending") return "대기";
    if (status === "approved") return "완료";
    if (status === "rejected") return "반려";
  }

  return (
    <div ref={scrollContainerRef}>
      <>
        <p className="text-xs text-muted-foreground font-medium my-5">
          {getStatusText(status)} {reviewList.length}건
        </p>
        {reviewList.map((review) => (
          <div
            key={review.id}
            onClick={() => selectReviewItem(review.id.toString())}
            className={cn(
              "flex items-start gap-2 border rounded-md px-4 py-3 cursor-pointer bg-accent/20 hover:bg-accent transition-colors mb-2 relative",
              reviewItemId === review.id.toString() && "bg-accent "
            )}
          >
            <div
              className={`min-w-1.5 min-h-1.5 mt-1 rounded-full ${getStatusColor(
                status
              )}`}
            />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold line-clamp-1">
                {review.title}
              </p>
              <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                {review.body}
              </p>
              <p className="text-[10px] text-muted-foreground font-semibold">
                {review.createdAt}
              </p>
            </div>
          </div>
        ))}
      </>
    </div>
  );
}
