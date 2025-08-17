"use server";

import {
  bannerCreateSchema,
  bannerUpdateSchema,
  changeOrderSchema,
  deleteBannerSchema,
} from "@/app/banner/_action/schema";
import { actionClient } from "@/lib/utils";
import { redirect } from "next/navigation";

export const changeOrderAction = actionClient
  .inputSchema(changeOrderSchema)
  .action(async ({ parsedInput }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("배너 순서 변경:", parsedInput);
    return { message: "배너 순서를 변경했습니다." };
  });

export const bannerCreateAction = actionClient
  .inputSchema(bannerCreateSchema)
  .action(async ({ parsedInput }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("배너 생성:", parsedInput);
    return { message: "배너를 생성했습니다." };
  });

export const bannerUpdateAction = actionClient
  .inputSchema(bannerUpdateSchema)
  .action(async ({ parsedInput }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("배너 수정:", parsedInput);
    return { message: "배너를 수정했습니다." };
  });

export const deleteBannerAction = actionClient
  .inputSchema(deleteBannerSchema)
  .action(async ({ parsedInput }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("배너 삭제:", parsedInput);
    redirect("/banner");
  });
