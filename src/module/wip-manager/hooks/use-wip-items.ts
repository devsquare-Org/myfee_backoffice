"use client";

import { useEffect, useState } from "react";
import { fetchItemsData } from "@/app/(private)/challenge-review/_action/data";
import createClientOnBrowser from "@/module/wip-manager/supabase/client";

export type WipItem = {
  id: string;
  reviewItemId: number;
  adminId: string;
  status: "viewing" | "reviewed";
  createdAt: string | null;
  completedAt: string | null;
};

export function useWipItems() {
  const [wipItemList, setWipItemList] = useState<WipItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeWipItems() {
      try {
        setIsLoading(true);

        // 초기 데이터 fetch
        const { data } = await fetchItemsData();
        if (data) {
          const transformedData = data.map((item) => ({
            id: item.id,
            reviewItemId: item.review_item_id,
            adminId: item.admin_id,
            status: item.status! as "viewing" | "reviewed",
            createdAt: item.created_at,
            completedAt: item.completed_at,
          }));
          setWipItemList(transformedData);
        }

        // 실시간 구독 시작
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
              console.log("WIP 아이템 변경감지:", payload);

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

              if (payload.eventType === "DELETE") {
                const deletedItem = payload.old;
                setWipItemList((prev) =>
                  prev.filter((item) => item.id !== deletedItem.id)
                );
              }
            }
          )
          .subscribe();

        setError(null);

        return () => {
          channel.unsubscribe();
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    const cleanup = initializeWipItems();

    return () => {
      cleanup.then((cleanupFn) => cleanupFn?.());
    };
  }, []);

  // 특정 reviewItemId의 WIP 아이템 찾기
  const findWipItem = (reviewItemId: number) => {
    return wipItemList.find((item) => item.reviewItemId === reviewItemId);
  };

  return {
    wipItemList,
    isLoading,
    error,
    findWipItem,
  };
}
