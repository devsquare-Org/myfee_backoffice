"use server";

import { notificationFormSchema } from "@/app/notification/_action/shcema";
import { actionClient } from "@/lib/utils";

export const notificationAction = actionClient
  .inputSchema(notificationFormSchema)
  .action(async ({ parsedInput }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(parsedInput);
    return { message: "알림을 발송했습니다." };
  });
