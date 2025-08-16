"use server";

import {
  bannerDetailSchema,
  bannerListSchema,
  getBannerDetailSchema,
} from "@/app/content/_action/schema";
import z from "zod";

const bannerListMock = [
  {
    id: "1",
    title: "[신규회원 혜택] 전제품 체험 패키지 할인 이벤트",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=100&fit=crop",
    linkUrl: "https://lifeb.kr",
    order: 1,
    createdAt: "2025-01-01 12:00:00",
    updatedAt: "2025-01-01 12:00:00",
  },
  {
    id: "2",
    title: "리뷰 작성 이벤트",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=100&fit=crop",
    linkUrl: "https://lifeb.kr",
    order: 2,
    createdAt: "2025-01-01 12:00:00",
    updatedAt: "2025-01-01 12:00:00",
  },
  {
    id: "3",
    title: "특가 이벤트",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&h=100&fit=crop",
    linkUrl: "https://lifeb.kr",
    order: 3,
    createdAt: "2025-01-01 12:00:00",
    updatedAt: "2025-01-01 12:00:00",
  },
] as z.infer<typeof bannerListSchema>;

export async function fetchBannerList(): Promise<{
  data: z.infer<typeof bannerListSchema>;
  message: string;
}> {
  return {
    data: bannerListMock,
    message: "배너 목록을 성공적으로 조회하였습니다.",
  };
}

export async function getBannerDetail(
  params: z.infer<typeof getBannerDetailSchema>
): Promise<{
  data: z.infer<typeof bannerDetailSchema>;
  message: string;
}> {
  console.log(params);
  const data = bannerListMock.find((item) => item.id === params.id);

  return {
    data: data as z.infer<typeof bannerDetailSchema>,
    message: "배너 상세 정보를 성공적으로 조회하였습니다.",
  };
}
