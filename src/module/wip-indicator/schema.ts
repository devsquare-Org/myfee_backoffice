import { z } from "zod";

export const insertWipItemsSchema = z.object({
  reviewItemId: z.number(),
  adminId: z.string(),
  status: z
    .string()
    .refine((status) => status === "viewing" || status === "reviewed"),
});

export const updateWipItemsSchema = z.object({
  reviewItemId: z.number(),
  adminId: z.string().optional(),
  status: z
    .string()
    .refine((status) => status === "viewing" || status === "reviewed")
    .optional(),
  completedAt: z.string().optional().nullable(),
});

export const deleteWipItemsSchema = z.object({
  reviewItemId: z.number(),
});
