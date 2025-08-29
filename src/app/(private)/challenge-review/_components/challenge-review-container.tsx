import { PreviewCard } from "@/app/(private)/challenge-review/_components/preview-card";
import ReviewContainerFooter from "@/app/(private)/challenge-review/_components/review-container-footer";
import { ReviewList } from "@/app/(private)/challenge-review/_components/review-list";

const reviewList = [
  {
    id: 1,
    title:
      "일주일에 헬스장 4번 가기일주일에 헬스장 4번 가기일주일에 헬스장 4번 가기",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=100&fit=crop",
    body: "오운완 챌린지 재미있어요!오운완 챌린지 재미있어요!오운완 챌린지 재미있어요!",
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    title: "일주일에 헬스장 2번 가기",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=100&fit=crop",
    body: "꾸준히 하는 게 쉽지는 않네요!",
    createdAt: "2025-01-03",
  },
  {
    id: 3,
    title: "매일 단백질 코코밥 섭취하기",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=100&fit=crop",
    body: "코코밥 먹고 있어요!",
    createdAt: "2025-01-05",
  },
  {
    id: 4,
    title: "아침 공복 유산소 20분 하기",
    image:
      "https://images.unsplash.com/photo-1526401485004-2aa7c4b4c15b?w=150&h=100&fit=crop",
    body: "처음엔 힘들었는데 점점 상쾌해져요!",
    createdAt: "2025-01-07",
  },
  {
    id: 5,
    title: "주 3회 스트레칭 루틴 지키기",
    image:
      "https://images.unsplash.com/photo-1526403223608-eca2f0b8f8a9?w=150&h=100&fit=crop",
    body: "몸이 덜 뻐근해서 좋습니다.",
    createdAt: "2025-01-10",
  },
  {
    id: 6,
    title: "매일 아침 물 500ml 마시기",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=150&h=100&fit=crop",
    body: "습관 들이니까 하루가 상쾌해요!",
    createdAt: "2025-01-12",
  },
  {
    id: 7,
    title: "야식 끊기 챌린지",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&h=100&fit=crop",
    body: "처음에는 배고파서 힘들었지만 성공 중입니다.",
    createdAt: "2025-01-15",
  },
  {
    id: 8,
    title: "일주일에 책 한 권 읽기",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=150&h=100&fit=crop",
    body: "독서 습관이 조금씩 자리 잡고 있어요.",
    createdAt: "2025-01-18",
  },
  {
    id: 9,
    title: "매일 영어 단어 10개 외우기",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=100&fit=crop",
    body: "꾸준히 하니 어휘력이 늘고 있어요.",
    createdAt: "2025-01-20",
  },
  {
    id: 10,
    title: "주말 아침 조깅하기",
    image:
      "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=150&h=100&fit=crop",
    body: "상쾌하게 하루를 시작할 수 있어 만족합니다.",
    createdAt: "2025-01-22",
  },
  {
    id: 11,
    title: "주말 아침 조깅하기",
    image:
      "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=150&h=100&fit=crop",
    body: "상쾌하게 하루를 시작할 수 있어 만족합니다.",
    createdAt: "2025-01-22",
  },
  {
    id: 12,
    title: "주말 아침 조깅하기",
    image:
      "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=150&h=100&fit=crop",
    body: "상쾌하게 하루를 시작할 수 있어 만족합니다.",
    createdAt: "2025-01-22",
  },
];

export function ChallengeReviewContainer() {
  return (
    <div className="flex border-t">
      {/* left side */}
      <div className="w-1/4 border-r pr-4">
        <ReviewList reviewList={reviewList} />
        <ReviewContainerFooter
          length={reviewList.length}
          page={1}
          pageSize={10}
          totalItems={3000}
        />
      </div>

      {/* right side */}
      <div className="w-3/4">
        <PreviewCard />
      </div>
    </div>
  );
}
