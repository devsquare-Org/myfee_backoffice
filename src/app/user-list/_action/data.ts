"use server";

import { userListRequestParams, userListResponse } from "./schema";
import { z } from "zod";

export async function fetchUserList(
  params: z.infer<typeof userListRequestParams>
): Promise<{
  data: z.infer<typeof userListResponse>;
  message: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
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
  ];

  console.log(params, data);

  return { data, message: "success" };
}
