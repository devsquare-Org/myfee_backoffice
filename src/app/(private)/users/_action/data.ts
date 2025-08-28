"use server";

import {
  userChallengeHistoryParams,
  userDetailParams,
  userListParams,
  userPointHistoryParams,
} from "@/app/(private)/users/_action/req-schema";
import {
  userChallengeHistoryResponse,
  userDetailResponse,
  userListResponse,
  userPointHistoryResponse,
} from "@/app/(private)/users/_action/res-schema";
import { z } from "zod";

export async function fetchUserList(
  params: z.infer<typeof userListParams>
): Promise<{
  data: z.infer<typeof userListResponse>;
  message: string;
}> {
  console.log(">>>>>>>>>>>", decodeURIComponent(params.search || ""));
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      id: "1",
      name: "홍길동1",
      nickname: "hong1231",
      email: "hong@gmail.com",
      image: "https://via.placeholder.com/150",
      createdAt: "2025-01-01 12:00:00",
      phone: "010-1234-5678",
    },
    {
      id: "2",
      name: "김철수2",
      nickname: "kim1232",
      email: "hong@gmail.com",
      image: "https://via.placeholder.com/150",
      createdAt: "2025-01-01 12:00:00",
      phone: "010-1234-5678",
    },
    {
      id: "3",
      name: "박영희3",
      nickname: "park1233",
      email: "hong@gmail.com",
      image: "https://via.placeholder.com/150",
      createdAt: "2025-01-01 12:00:00",
      phone: "010-1234-5678",
    },
    {
      id: "4",
      name: "이영수4",
      nickname: "lee1234",
      email: "hong@gmail.com",
      image: "https://via.placeholder.com/150",
      createdAt: "2025-01-01 12:00:00",
      phone: "010-1234-5678",
    },
    {
      id: "5",
      name: "김민수5",
      nickname: "kim1235",
      email: "hong@gmail.com",
      image: "https://via.placeholder.com/150",
      createdAt: "2025-01-01 12:00:00",
      phone: "010-1234-5678",
    },
    {
      id: "6",
      name: "최지훈6",
      nickname: "choi1236",
      email: "hong@gmail.com",
      image: "https://via.placeholder.com/150",
      createdAt: "2025-01-01 12:00:00",
      phone: "010-1234-5678",
    },
    {
      id: "7",
      name: "김지현7",
      nickname: "kim1237",
      email: "hong@gmail.com",
      image: "https://via.placeholder.com/150",
      createdAt: "2025-01-01 12:00:00",
      phone: "010-1234-5678",
    },
    {
      id: "8",
      name: "이지현8",
      nickname: "lee1238",
      email: "hong@gmail.com",
      image: "https://via.placeholder.com/150",
      createdAt: "2025-01-01 12:00:00",
      phone: "010-1234-5678",
    },
  ];

  // console.log(params, data);

  return { data, message: "success" };
}

export async function fetchUserDetail(
  params: z.infer<typeof userDetailParams>
): Promise<{
  data: z.infer<typeof userDetailResponse>;
  message: string;
}> {
  const userDetail = {
    nickname: "nickname",
    name: "name",
    phone: "01012345678",
    email: "sole@lifeb.kr",
    shopbyUserId: "122700946",
  };
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: userDetail,
    message: "유저 상세 정보를 성공적으로 조회하였습니다.",
  };
}

export async function fetchUserPointHistory(
  params: z.infer<typeof userPointHistoryParams>
): Promise<{
  data: z.infer<typeof userPointHistoryResponse>;
  message: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const pointHistory = [
    {
      id: "1",
      point: 3500,
      reason: "환전",
      type: "차감",
      createdAt: "2023-10-05 12:00:00",
    },
    {
      id: "2",
      reason: "챌린지 중간 리워드",
      point: 1000,
      createdAt: "2023-10-04 12:00:00",
      type: "지급",
    },
    {
      id: "3",
      point: 500,
      reason: "챌린지 참여 리워드",
      createdAt: "2023-10-03 12:00:00",
      type: "지급",
    },
    {
      id: "4",
      point: 500,
      reason: "CS 보상",
      createdAt: "2023-10-03 12:00:00",
      type: "지급",
      adminId: "sole",
    },
    {
      id: "5",
      point: 2000,
      reason: "가입 축하 리워드",
      createdAt: "2023-10-02 12:00:00",
      type: "지급",
    },
  ];

  return {
    data: pointHistory,
    message: "포인트 내역을 성공적으로 조회하였습니다.",
  };
}

export async function fetchUserChallengeHistory(
  params: z.infer<typeof userChallengeHistoryParams>
): Promise<{
  data: z.infer<typeof userChallengeHistoryResponse>;
  message: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const challengeHistory = [
    {
      id: "1",
      name: "10월 챌린지",
      reviewCount: 15,
      result: "성공",
      createdAt: "2023-10-05 12:00:00",
    },
    {
      id: "2",
      name: "9월 챌린지",
      reviewCount: 8,
      result: "실패",
      createdAt: "2023-09-30 12:00:00",
    },
    {
      id: "3",
      name: "8월 챌린지",
      reviewCount: 12,
      result: "성공",
      createdAt: "2023-10-03 12:00:00",
    },
  ];

  return {
    data: challengeHistory,
    message: "챌린지 내역을 성공적으로 조회하였습니다.",
  };
}
