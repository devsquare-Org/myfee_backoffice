"use client";

import { fetchWipItemsData } from "@/app/(private)/challenge-review/_action/data";
import createClientOnBrowser from "@/lib/supabase/supabase-client";
import { getUserIdClient } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type WipItem = {
  id: string;
  reviewItemId: number;
  adminId: string;
  status: "viewing" | "reviewed";
  createdAt: string | null;
  completedAt: string | null;
};

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
  const [wipItemList, setWipItemList] = useState<WipItem[]>([]);
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

  // wipItemList 실시간 업데이트
  useEffect(() => {
    const channel = createClientOnBrowser()
      .channel("wip-items")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wip_items",
        },
        (payload) => {
          // 새로운 아이템 추가 시
          if (payload.eventType === "INSERT") {
            const newItem = payload.new;
            setWipItemList((prev) => [
              ...prev,
              {
                id: newItem.id,
                reviewItemId: newItem.review_item_id,
                adminId: newItem.admin_id,
                status: newItem.status as "viewing" | "reviewed",
                createdAt: newItem.created_at,
                completedAt: newItem.completed_at,
              },
            ]);
          }

          // 아이템 업데이트 시
          if (payload.eventType === "UPDATE") {
            const updatedItem = payload.new;
            setWipItemList((prev) =>
              prev.map((item) =>
                item.id === updatedItem.id
                  ? {
                      id: updatedItem.id,
                      reviewItemId: updatedItem.review_item_id,
                      adminId: updatedItem.admin_id,
                      status: updatedItem.status as "viewing" | "reviewed",
                      createdAt: updatedItem.created_at,
                      completedAt: updatedItem.completed_at,
                    }
                  : item
              )
            );
          }

          // 아이템 삭제 시
          if (payload.eventType === "DELETE") {
            const deletedItem = payload.old;
            setWipItemList((prev) =>
              prev.filter((item) => item.id !== deletedItem.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchWipItemList() {
      const { data } = await fetchWipItemsData();
      if (data) {
        setWipItemList(
          data.map((item) => ({
            id: item.id,
            reviewItemId: item.review_item_id,
            adminId: item.admin_id,
            status: item.status! as "viewing" | "reviewed",
            createdAt: item.created_at,
            completedAt: item.completed_at,
          }))
        );
      }
    }
    fetchWipItemList();
  }, []);

  // wipItemList에서 특정 reviewItemId의 아이템 찾기
  function findWipItem(reviewItemId: number) {
    return wipItemList.find((item) => item.reviewItemId === reviewItemId);
  }

  // 검수 상태 텍스트 반환 (자신의 아이템은 제외)
  function getWipStatusText(reviewItemId: number) {
    const item = findWipItem(reviewItemId);
    if (!item) return null;

    const currentUserId = getUserIdClient();
    // 자신의 아이템인데 검수 중인 경우 표시하지 않음(검수 완료는 표시)
    if (item.adminId === currentUserId && item.status === "viewing")
      return null;

    if (item.status === "viewing") return "보는중";
    if (item.status === "reviewed") return "검수 완료";
    return null;
  }

  // 검수 상태 색상 반환 (자신의 아이템은 제외)
  function getWipStatusColor(reviewItemId: number) {
    const item = findWipItem(reviewItemId);
    if (!item) return null;

    const currentUserId = getUserIdClient();
    // 자신의 아이템인데 검수 중인 경우 표시하지 않음(검수 완료는 표시)
    if (item.adminId === currentUserId && item.status === "viewing")
      return null;

    if (item.status === "viewing") return "bg-orange-100 text-orange-800";
    if (item.status === "reviewed") return "bg-green-100 text-green-800";
    return null;
  }

  // 클릭 가능 여부 확인 (자신의 아이템은 클릭 가능)
  function isClickable(reviewItemId: number) {
    const item = findWipItem(reviewItemId);
    if (!item) return true;

    const currentUserId = getUserIdClient();
    // 자신의 아이템인 경우 클릭 가능 (단, 검수 완료된 것은 제외)
    if (item.adminId === currentUserId && item.status === "viewing") return true;

    // 다른 사람의 진행중인 아이템인 경우 클릭 불가
    return item.status !== "viewing" && item.status !== "reviewed";
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

  function generateBtnStyle(reviewId: number) {
    const isSelected = reviewItemId === reviewId.toString();
    const clickable = isClickable(reviewId);

    let baseClass =
      "flex items-start gap-2 border rounded-md px-4 py-3 transition-colors mb-2 relative";

    if (isSelected) {
      baseClass += " bg-accent";
    } else if (clickable) {
      baseClass += " cursor-pointer bg-accent/20 hover:bg-accent";
    } else {
      baseClass += " cursor-not-allowed bg-accent/20 opacity-50";
    }

    return baseClass;
  }
  return (
    <div ref={scrollContainerRef} className="h-full overflow-y-auto">
      <p className="text-xs text-muted-foreground font-medium my-5">
        {getStatusText(status)} {reviewList.length}건
      </p>
      {reviewList.map((review) => (
        <div key={review.id} className="relative">
          <div
            onClick={() => {
              if (isClickable(review.id)) {
                selectReviewItem(review.id.toString());
              }
            }}
            className={generateBtnStyle(review.id)}
          >
            <div
              className={`min-w-1.5 min-h-1.5 mt-1 rounded-full ${getStatusColor(
                status
              )}`}
            />
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
          {getWipStatusText(review.id) && (
            <div
              className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full font-medium ${getWipStatusColor(
                review.id
              )}`}
            >
              {getWipStatusText(review.id)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
