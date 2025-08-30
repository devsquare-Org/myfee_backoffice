import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { approveChallengeReviewAction } from "@/app/(private)/challenge-review/_action/action";
import { toast } from "sonner";
import { useFetchReviewList } from "@/app/(private)/challenge-review/_hooks/use-fetch-review-list";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

type Props = {
  reviewId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isActionExecuting: boolean;
  setIsActionExecuting: (isActionExecuting: boolean) => void;
};

export function ApprovedDialog({
  reviewId,
  isOpen,
  setIsOpen,
  isActionExecuting,
  setIsActionExecuting,
}: Props) {
  const { fetchReviewList } = useFetchReviewList();
  const { execute, isExecuting } = useAction(approveChallengeReviewAction, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      setIsOpen(false);
      fetchReviewList();
      setIsActionExecuting(isExecuting);
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
      setIsActionExecuting(isExecuting);
      fetchReviewList();
      setIsActionExecuting(isExecuting);
      setIsOpen(false);
    },
  });

  function handleApprove() {
    setIsActionExecuting(isExecuting);
    execute({ id: reviewId });
    setIsActionExecuting(isExecuting);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsActionExecuting(isExecuting);
  }, [isExecuting]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="default"
          disabled={isExecuting || isActionExecuting}
        >
          승인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>인증 승인</DialogTitle>
        </DialogHeader>
        <p className="text-sm font-medium">인증 요청을 승인 하시겠습니까?</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isExecuting || isActionExecuting}
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleApprove}
            disabled={isExecuting || isActionExecuting}
          >
            {isExecuting ? <Loader2 className="animate-spin" /> : "승인"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
