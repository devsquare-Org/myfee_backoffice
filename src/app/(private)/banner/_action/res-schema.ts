import * as z from "zod";

export const bannerListResponse = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    linkUrl: z.string(),
    order: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
);

export const bannerDetailResponse = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  linkUrl: z.string(),
  order: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
