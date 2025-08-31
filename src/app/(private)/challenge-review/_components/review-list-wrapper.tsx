"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ReviewList } from "@/app/(private)/challenge-review/_components/review-list";
import { useFetchReviewList } from "@/app/(private)/challenge-review/_hooks/use-fetch-review-list";
import PaginationWrapper from "@/app/(private)/challenge-review/_components/pagination-wrapper";

export function ReviewListWrapper() {
  const searchParams = useSearchParams();
  const { fetchReviewList, reviewList } = useFetchReviewList();

  // 리뷰 목록 패치에 필요한 파라미터들만 추출 (reviewItemId는 제외)
  const status = searchParams.get("status") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    fetchReviewList();
  }, [status, startDate, endDate, page]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <ReviewList reviewList={reviewList} />
      </div>
      <div>
        <PaginationWrapper
          length={reviewList.length}
          page={parseInt(page)}
          pageSize={10}
          totalItems={reviewList.length}
        />
      </div>
    </div>
  );
}
