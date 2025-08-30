"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchChallengeReviewList } from "@/app/(private)/challenge-review/_action/data";
import { useState } from "react";

type ReviewItem = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
};

export function useFetchReviewList() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);

  // 리뷰 목록 패치에 필요한 파라미터들만 추출 (reviewItemId는 제외)
  const status = searchParams.get("status") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const page = searchParams.get("page") || "1";

  async function fetchReviewList() {
    const { data } = await fetchChallengeReviewList({
      status,
      startDate,
      endDate,
      page,
    });
    setReviewList(data);

    if (data.length > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("reviewItemId", data[0].id.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return { fetchReviewList, reviewList };
}
