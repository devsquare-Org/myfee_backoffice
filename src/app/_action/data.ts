"use server";

import {
  dashboardDataRequestParams,
  dashboardDataResponse,
} from "@/app/_action/shcema";
import { z } from "zod";

export async function fetchDashboardData(
  params: z.infer<typeof dashboardDataRequestParams>
): Promise<{
  data: z.infer<typeof dashboardDataResponse>;
  message: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    startDate: params.startDate,
    endDate: params.endDate,
    userCount: 10,
    pointCount: 100000,
    totalUserCount: 100,
    totalPointCount: 1000000,
    userList: [
      {
        id: "1",
        name: "홍길동",
        nickname: "hong123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
      },
      {
        id: "2",
        name: "김철수",
        nickname: "kim123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
      },
      {
        id: "3",
        name: "박영희",
        nickname: "park123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
      },
      {
        id: "4",
        name: "이영수",
        nickname: "lee123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
      },
      {
        id: "5",
        name: "김민수",
        nickname: "kim123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
      },
      {
        id: "6",
        name: "최지훈",
        nickname: "choi123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
      },
      {
        id: "7",
        name: "김지현",
        nickname: "kim123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
      },
      {
        id: "8",
        name: "이지현",
        nickname: "lee123",
        email: "hong@gmail.com",
        image: "https://via.placeholder.com/150",
        createdAt: "2025-01-01 12:00:00",
      },
    ],
  } as z.infer<typeof dashboardDataResponse>;

  console.log(params, data);
  return {
    data,
    message: "대시보드 데이터를 성공적으로 조회하였습니다.",
  };
}
