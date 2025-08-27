import { SectionCards } from "@/components/section-card";
import { DateRangePicker } from "@/components/date-range-picker";
import { UserList } from "@/app/(private)/users/_components/user-list";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { fetchDashboardData } from "@/app/(private)/dashboard/_action/data";

type Props = {
  startDate: string;
  endDate: string;
};

export async function Dashboard({ startDate, endDate }: Props) {
  const dashboardData = await fetchDashboardData({
    startDate,
    endDate,
  });

  const { postCount, challengeReviewtCount, pointCount, userList, userCount } =
    dashboardData.data;

  return (
    <div>
      <DateRangePicker placeholder="기간을 선택하세요" className="mb-6" />
      <SectionCards
        userCount={userCount}
        postCount={postCount}
        challengeReviewtCount={challengeReviewtCount}
        pointCount={pointCount}
      />
      <div className="flex items-center gap-2 mt-12 mb-2">
        <p className="text-base font-semibold">가입 유저</p>
        <Tooltip delayDuration={600}>
          <TooltipTrigger asChild>
            <InfoIcon className="w-4 h-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={10}>
            최대 10명까지 보여지며 더 많은 목록을 보려면 유저 목록 페이지를
            이용해주세요.
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-xs text-muted-foreground font-semibold mb-4">
        조회한 기간에 가입한 유저 목록입니다.
      </p>
      <div className="border rounded-2xl p-6">
        <UserList userList={userList} />
      </div>
    </div>
  );
}
