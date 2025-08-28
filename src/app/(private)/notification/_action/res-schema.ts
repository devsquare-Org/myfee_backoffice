import * as z from "zod";

export const notificationHistoryResponse = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.string(),
    adminId: z.string(),
    isAd: z.boolean(),
  })
);
