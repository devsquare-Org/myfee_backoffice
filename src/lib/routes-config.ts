export const ROUTES = {
  DASHBOARD: "/dashboard",
  CHALLENGE_LIST: "/challenge-list",
  CHALLENGE_REVIEW_LIST: "/challenge-review-list",
  USER_LIST: "/user-list",
  NOTIFICATION: "/notification",
  NOTIFICATION_SEND: "/notification/send",
  COUPON: "/coupon",
  BANNER: "/banner",
  BANNER_CREATE: "/banner/create",
  USER: "/user",
  SIGNIN: "/signin",
  SHOPBY_TEST: "/shopby-test",
} as const;

// 페이지 라벨 매핑 (경로별)
export const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "대시보드",
  "/challenge-list": "챌린지 관리",
  "/challenge-review-list": "챌린지 리뷰 관리",
  "/user-list": "유저 관리",
  "/notification": "푸시 알림",
  "/notification/send": "푸시 알림 발송",
  "/coupon": "쿠폰 관리",
  "/banner": "배너 관리",
  "/banner/create": "배너 추가",
  "/user": "유저 관리",
};

// 하위 페이지 라벨 매핑 (세그먼트별)
export const SEGMENT_LABELS: Record<string, string> = {
  send: "발송",
  detail: "상세",
  edit: "수정",
  create: "생성",
};
