import * as z from "zod";

export const dashboardDataResponse = z.object({
  startDate: z.string(),
  endDate: z.string(),
  postCount: z.number(),
  challengeReviewCount: z.number(),
  userCount: z.number(),
  pointCount: z.number(),
  userList: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      nickname: z.string(),
      email: z.string(),
      image: z.string(),
      createdAt: z.string(),
      phone: z.string(),
    })
  ),
});
