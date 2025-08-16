import * as z from "zod";
import { zfd } from "zod-form-data";

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

export const bannerCreateSchema = zfd.formData({
  title: z.string().min(3, "제목을 3자 이상 입력해주세요."),
  imageFile: zfd
    .file()
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "이미지 크기는 5MB 이하여야 합니다.",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "이미지 파일만 업로드 가능합니다.",
    }),
  linkUrl: z.url({ message: "링크를 정확하게 입력해주세요." }),
});
