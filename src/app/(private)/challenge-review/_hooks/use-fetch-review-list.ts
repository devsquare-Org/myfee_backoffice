"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchChallengeReviewList } from "@/app/(private)/challenge-review/_action/data";
import { useState } from "react";

type ReviewItem = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  status?: "viewing" | "reviewed";
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

  // 여기서 구독 시작
  // wipList 상태 별도로 두기

  // reviewList 패치 시 wipList 패치 후 매핑하여 새로운 리스트 리턴
  // wipList 상태 변경 시 새로운 리스트 업데이트

  // reviewList 컴포넌트에서는 reviewItem의 status를 참조하여 UI 상태 계산

  // reviewList와 wipList를 매핑한 리스트를 순회하며 검수중이거나 검수 완료가 아닌 리뷰아이템을 찾아서 변수에 넣기
  // 변수 값을 reviewItemId 서치파라미터에 추가

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
