import * as z from "zod";

export const userListResponse = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    nickname: z.string(),
    email: z.string(),
    image: z.string(),
    createdAt: z.string(),
    phone: z.string(),
  })
);

export const userDetailResponse = z.object({
  nickname: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  shopbyUserId: z.string(),
});

export const userPointHistoryResponse = z.array(
  z.object({
    id: z.string(),
    point: z.number(),
    reason: z.string(),
    type: z.string(),
    createdAt: z.string(),
  })
);

export const userChallengeHistoryResponse = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    reviewCount: z.number(),
    result: z.string(),
    createdAt: z.string(),
  })
);
