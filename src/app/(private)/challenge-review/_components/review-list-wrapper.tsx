"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ReviewList } from "@/app/(private)/challenge-review/_components/review-list";
import ReviewContainerFooter from "@/app/(private)/challenge-review/_components/review-container-footer";
import { useFetchReviewList } from "@/app/(private)/challenge-review/_hooks/use-fetch-review-list";

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
    <>
      <ReviewList reviewList={reviewList} />
      <ReviewContainerFooter
        length={reviewList.length}
        page={parseInt(page)}
        pageSize={10}
        totalItems={reviewList.length}
      />
    </>
  );
}
