import * as z from "zod";

export const dashboardDataRequestParams = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const dashboardDataResponse = z.object({
  startDate: z.string(),
  endDate: z.string(),
  userCount: z.number(),
  pointCount: z.number(),
  totalUserCount: z.number(),
  totalPointCount: z.number(),
  userList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      nickname: z.string(),
      email: z.string(),
      image: z.string(),
      createdAt: z.string(),
    })
  ),
});
