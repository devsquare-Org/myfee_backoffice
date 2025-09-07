"use client";

import { useEffect, useState } from "react";
import createClientOnBrowser from "@/module/wip-manager/supabase/client";
import wipManager from "@/module/wip-manager";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type WipItemStatus = "viewing" | "reviewed";

type WipItemRow = {
  id: string;
  review_item_id: number;
  admin_id: string;
  status: WipItemStatus;
  created_at: string;
  completed_at: string | null;
};

type WipItemsPayload = RealtimePostgresChangesPayload<WipItemRow>;

export function useWipItems() {
  const [wipItemList, setWipItemList] = useState<WipItemRow[]>([]);

  // Realtime 이벤트 처리 함수
  function realtimeEventCallback(payload: WipItemsPayload) {
    switch (payload.eventType) {
      case "INSERT":
        if (payload.new) {
          setWipItemList((prev) => [...prev, payload.new]);
        }
        break;

      case "UPDATE":
        if (payload.new) {
          setWipItemList((prev) =>
            prev.map((item) =>
              item.id === payload.new!.id ? payload.new! : item
            )
          );
        }
        break;

      case "DELETE":
        if (payload.old) {
          setWipItemList((prev) =>
            prev.filter((item) => item.id !== payload.old!.id)
          );
        }
        break;
    }
  }

  useEffect(() => {
    async function initializeWipItems() {
      // 초기 wip items 데이터 받아오기
      const { data } = await wipManager.getItems();
      setWipItemList(data as WipItemRow[]);

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
          // 실시간 이벤트 처리
          (payload) => realtimeEventCallback(payload as WipItemsPayload)
        )
        .subscribe();

      return () => {
        channel.unsubscribe();
      };
    }

    const cleanup = initializeWipItems();

    return () => {
      cleanup.then((cleanupFn) => cleanupFn?.());
    };
  }, []);

  // 특정 reviewItemId의 WIP 아이템 찾기
  function findWipItem(reviewItemId: number) {
    return wipItemList.find((item) => item.review_item_id === reviewItemId);
  }

  return {
    wipItemList,
    findWipItem,
  };
}
