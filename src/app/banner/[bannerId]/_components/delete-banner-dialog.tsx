"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBannerAction } from "@/app/banner/_action/action";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { CustomAlert } from "@/components/custom-alert";

type Props = {
  id: string;
};

export function DeleteBannerDialog({ id }: Props) {
  const { execute, isExecuting } = useAction(deleteBannerAction, {
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
    },
  });

  function handleDelete() {
    execute({ id });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="!mt-0 shrink-0">
          배너 삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>배너 삭제</DialogTitle>
        </DialogHeader>

        <div>
          <CustomAlert
            className="mb-4 col-span-1"
            title="배너 삭제 주의사항"
            description={
              <ul className="flex flex-col gap-1 mt-2 list-disc list-outside">
                <li>배너 삭제 시 모든 데이터가 삭제됩니다.</li>
                <li>삭제 후 복구가 불가능합니다.</li>
              </ul>
            }
            type="destructive"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isExecuting}>
              취소
            </Button>
          </DialogClose>
          <Button
            disabled={isExecuting}
            variant="destructive"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
