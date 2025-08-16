import * as z from "zod";

export const bannerListSchema = z.array(
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

export const changeOrderSchema = z.array(
  z.object({
    id: z.string(),
    order: z.number(),
  })
);
