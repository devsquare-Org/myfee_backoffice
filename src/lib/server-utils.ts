"use server";

import { revalidatePath } from "next/cache";

export async function revalidateCacheByPath(path: string) {
  revalidatePath(path);
}
