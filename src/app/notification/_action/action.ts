"use server";

import { sendNotificationParams } from "@/app/notification/_action/shcema";
import { actionClient } from "@/lib/utils";

export const sendNotificationAction = actionClient
  .inputSchema(sendNotificationParams)
  .action(async ({ parsedInput }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { message: "알림을 발송했습니다." };
  });
