"use client";

import { revalidateCacheByPath } from "@/lib/server-utils";

export function useRevalidate() {
  const revalidatePage = (path: string) => {
    return revalidateCacheByPath(path);
  };

  return {
    revalidatePage,
  };
}
