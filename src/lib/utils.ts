import { clsx, type ClassValue } from "clsx";
import { createSafeActionClient } from "next-safe-action";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const actionClient = createSafeActionClient({
  async handleServerError(e) {
    console.log(">>>ERROR<<<", e);
    return {
      message: e.message,
    };
  },
});
