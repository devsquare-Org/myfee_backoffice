import { PreviewCard } from "@/app/(private)/challenge-review/_components/preview-card";
import { ReviewListWrapper } from "@/app/(private)/challenge-review/_components/review-list-wrapper";

export function ChallengeReviewContainer() {
  return (
    <div className="flex border-t">
      {/* left side */}
      <div className="w-1/4 border-r pr-4">
        <ReviewListWrapper />
      </div>

      {/* right side */}
      <div className="w-3/4">
        <PreviewCard />
      </div>
    </div>
  );
}
