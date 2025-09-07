"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function revalidateCacheByPath(path: string) {
  revalidatePath(path);
}

export async function getUserIdServer(): Promise<string | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");

  return userId?.value || null;
}
