"use server";

import {
  bannerCreateSchema,
  changeOrderSchema,
} from "@/app/content/_action/schema";
import { actionClient } from "@/lib/utils";

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
