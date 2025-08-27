import * as z from 'zod';

export const userListRequestParams = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

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
