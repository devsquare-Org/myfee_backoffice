"use client";

import { getUserIdClient } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useWipItems } from "@/module/wip-manager/hooks/use-wip-items";

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
  const { findWipItem } = useWipItems();
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

  // 리뷰 아이템의 UI 상태를 한 번에 계산하는 함수
  function getReviewItemUIState(itemId: number) {
    const wipItem = findWipItem(itemId);
    const isSelected = reviewItemId === itemId.toString();

    if (!wipItem) {
      return {
        statusText: null,
        statusColor: null,
        isClickable: true,
        buttonStyle: isSelected
          ? "flex items-start gap-2 border rounded-md px-4 py-3 transition-colors mb-2 relative bg-accent"
          : "flex items-start gap-2 border rounded-md px-4 py-3 transition-colors mb-2 relative cursor-pointer bg-accent/20 hover:bg-accent",
      };
    }

    const currentUserId = getUserIdClient();
    const isOwnItem = wipItem.admin_id === currentUserId;
    const isViewing = wipItem.status === "viewing";
    const isReviewed = wipItem.status === "reviewed";
    const shouldShowStatus = !(isOwnItem && isViewing);
    const clickable = (isOwnItem && isViewing) || (!isViewing && !isReviewed);

    // 상태 텍스트
    let statusText = null;
    if (shouldShowStatus) {
      if (isViewing) statusText = "보는중";
      else if (isReviewed) statusText = "검수 완료";
    }

    // 상태 색상
    let statusColor = null;
    if (shouldShowStatus) {
      if (isViewing) statusColor = "bg-orange-100 text-orange-800";
      else if (isReviewed) statusColor = "bg-green-100 text-green-800";
    }

    // 버튼 스타일
    const baseClass =
      "flex items-start gap-2 border rounded-md px-4 py-3 transition-colors mb-2 relative";
    let buttonStyle = baseClass;
    if (isSelected) {
      buttonStyle += " bg-accent";
    } else if (clickable) {
      buttonStyle += " cursor-pointer bg-accent/20 hover:bg-accent";
    } else {
      buttonStyle += " cursor-not-allowed bg-accent/20 opacity-50";
    }

    return {
      statusText,
      statusColor,
      isClickable: clickable,
      buttonStyle,
    };
  }
  return (
    <div ref={scrollContainerRef} className="h-full overflow-y-auto">
      <StatusLabel status={status} length={reviewList.length} />
      {reviewList.map((review) => {
        const uiState = getReviewItemUIState(review.id);

        return (
          <div key={review.id} className="relative">
            <div
              onClick={() => {
                if (uiState.isClickable) selectReviewItem(review.id.toString());
              }}
              className={uiState.buttonStyle}
            >
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold line-clamp-1">
                    {review.title}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                  {review.body}
                </p>
                <p className="text-[10px] text-muted-foreground font-semibold">
                  {review.createdAt}
                </p>
              </div>
            </div>
            {uiState.statusText && (
              <div
                className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full font-medium ${uiState.statusColor}`}
              >
                {uiState.statusText}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatusLabel({ status, length }: { status: string; length: number }) {
  switch (status) {
    case "pending":
      return (
        <div className="flex items-center gap-2 my-4">
          <div className="min-w-2 min-h-2 max-w-2 max-h-2 rounded-full bg-yellow-500" />
          <p className="text-xs text-muted-foreground font-medium">
            대기중인 인증 {length}건
          </p>
        </div>
      );
    case "approved":
      return (
        <div className="flex items-center gap-2 my-4">
          <div className="min-w-2 min-h-2 max-w-2 max-h-2 rounded-full bg-blue-500" />
          <p className="text-xs text-muted-foreground font-medium">
            완료된 인증 {length}건
          </p>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-2 my-4">
          <div className="min-w-2 min-h-2 max-w-2 max-h-2 rounded-full bg-red-500" />
          <p className="text-xs text-muted-foreground font-medium">
            반려된 인증 {length}건
          </p>
        </div>
      );
  }
}
