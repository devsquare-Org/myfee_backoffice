export const ROUTES = {
  DASHBOARD: {
    path: "/",
    label: "대시보드",
  },
  CHALLENGE_LIST: {
    path: "/challenge-list",
    label: "챌린지 관리",
  },
  CHALLENGE_REVIEW_LIST: {
    path: "/challenge-review-list",
    label: "챌린지 리뷰 관리",
  },
  USER_LIST: {
    path: "/user-list",
    label: "유저 관리",
  },
  NOTIFICATION: {
    path: "/notification",
    label: "푸시 알림",
  },
  COUPON: {
    path: "/coupon",
    label: "쿠폰 관리",
  },
} as const;
