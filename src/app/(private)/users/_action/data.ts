'use server';

import { userListRequestParams, userListResponse } from './schema';
import { z } from 'zod';

export async function fetchUserList(
  params: z.infer<typeof userListRequestParams>
): Promise<{
  data: z.infer<typeof userListResponse>;
  message: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      id: '1',
      name: '홍길동1',
      nickname: 'hong1231',
      email: 'hong@gmail.com',
      image: 'https://via.placeholder.com/150',
      createdAt: '2025-01-01 12:00:00',
      phone: '010-1234-5678',
    },
    {
      id: '2',
      name: '김철수2',
      nickname: 'kim1232',
      email: 'hong@gmail.com',
      image: 'https://via.placeholder.com/150',
      createdAt: '2025-01-01 12:00:00',
      phone: '010-1234-5678',
    },
    {
      id: '3',
      name: '박영희3',
      nickname: 'park1233',
      email: 'hong@gmail.com',
      image: 'https://via.placeholder.com/150',
      createdAt: '2025-01-01 12:00:00',
      phone: '010-1234-5678',
    },
    {
      id: '4',
      name: '이영수4',
      nickname: 'lee1234',
      email: 'hong@gmail.com',
      image: 'https://via.placeholder.com/150',
      createdAt: '2025-01-01 12:00:00',
      phone: '010-1234-5678',
    },
    {
      id: '5',
      name: '김민수5',
      nickname: 'kim1235',
      email: 'hong@gmail.com',
      image: 'https://via.placeholder.com/150',
      createdAt: '2025-01-01 12:00:00',
      phone: '010-1234-5678',
    },
    {
      id: '6',
      name: '최지훈6',
      nickname: 'choi1236',
      email: 'hong@gmail.com',
      image: 'https://via.placeholder.com/150',
      createdAt: '2025-01-01 12:00:00',
      phone: '010-1234-5678',
    },
    {
      id: '7',
      name: '김지현7',
      nickname: 'kim1237',
      email: 'hong@gmail.com',
      image: 'https://via.placeholder.com/150',
      createdAt: '2025-01-01 12:00:00',
      phone: '010-1234-5678',
    },
    {
      id: '8',
      name: '이지현8',
      nickname: 'lee1238',
      email: 'hong@gmail.com',
      image: 'https://via.placeholder.com/150',
      createdAt: '2025-01-01 12:00:00',
      phone: '010-1234-5678',
    },
  ];

  // console.log(params, data);

  return { data, message: 'success' };
}
