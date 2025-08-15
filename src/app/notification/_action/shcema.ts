import * as z from "zod";

export const notificationFormSchema = z.object({
  title: z
    .string()
    .min(3, "3글자 이상 입력해주세요.")
    .max(20, "20자 이하로 입력해주세요."),
  content: z
    .string()
    .min(5, "5자 이상 입력해주세요.")
    .max(40, "40자 이하로 입력해주세요."),
});

export const notificationHistorySchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.string(),
    adminId: z.string(),
  })
);
