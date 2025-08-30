"use server";

import {
  approveChallengeReviewParams,
  rejectChallengeReviewParams,
} from "@/app/(private)/challenge-review/_action/req-schema";
import { actionClient } from "@/lib/utils";

export const approveChallengeReviewAction = actionClient
  .inputSchema(approveChallengeReviewParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // TODO: 서버 에러코드 받아서 메세지 구성
    if (Math.random() > 0.5) throw new Error("실패!");

    return { message: "인증 요청을 승인했습니다." };
  });

export const rejectChallengeReviewAction = actionClient
  .inputSchema(rejectChallengeReviewParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // TODO: 서버 에러코드 받아서 메세지 구성
    if (Math.random() > 0.5) throw new Error("실패!");

    return { message: "인증 요청을 반려했습니다." };
  });
