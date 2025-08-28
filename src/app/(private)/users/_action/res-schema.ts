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
