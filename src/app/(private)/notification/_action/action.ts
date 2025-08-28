"use server";

import { sendNotificationParams } from "@/app/(private)/notification/_action/req-schema";
import { actionClient } from "@/lib/utils";

export const sendNotificationAction = actionClient
  .inputSchema(sendNotificationParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { message: "알림을 발송했습니다." };
  });
