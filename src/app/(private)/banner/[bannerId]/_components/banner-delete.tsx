"use client";

import { DeleteBannerDialog } from "@/app/(private)/banner/[bannerId]/_components/delete-banner-dialog";
import { CustomAlert } from "@/components/custom-alert";

export default function BannerDelete({ id }: { id: string }) {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 max-w-xl">
        <div className="max-w-[800px]">
          <div className="space-y-2 flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
            <p className="leading-none text-muted-foreground font-medium text-xs mb-0">
              배너 삭제 시 모든 데이터가 삭제 및 반영되며 삭제 후에는 복구가
              불가능합니다.
            </p>
            <DeleteBannerDialog id={id} />
          </div>
        </div>
      </div>
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
  );
}
