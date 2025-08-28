'use server';

import {
  notificationHistoryRequestParams,
  notificationHistoryResponse,
} from '@/app/(private)/notification/_action/schema';
import { z } from 'zod';

export async function fetchNotificationHistory(
  params: z.infer<typeof notificationHistoryRequestParams>
): Promise<{
  data: z.infer<typeof notificationHistoryResponse>;
  message: string;
}> {
  const data = [
    {
      id: '1',
      title: '마이피 런칭 기념, 전상품 무료배송 진행!',
      content: '오늘 단 하루! 전상품 무료배송 이벤트 진행 중, 지금 서두르세요!',
      createdAt: '2025-01-01 12:00:00',
      adminId: 'sole',
      isAd: true,
    },
    {
      id: '2',
      title: '마이피 런칭 기념, 전상품 무료배송 진행!',
      content: '오늘 단 하루! 전상품 무료배송 이벤트 진행 중, 지금 서두르세요!',
      createdAt: '2025-01-02 12:00:00',
      adminId: 'sole',
      isAd: false,
    },
  ] as z.infer<typeof notificationHistoryResponse>;

  console.log(data);

  return {
    data,
    message: '발송 내역을 성공적으로 조회하였습니다.',
  };
}
