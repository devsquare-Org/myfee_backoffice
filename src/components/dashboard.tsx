import { SectionCards } from "@/components/section-card";
import { DateRangePicker } from "@/components/date-range-picker";
import { UserList } from "@/app/user-list/_components/user-list";

export function Dashboard() {
  return (
    <div>
      <DateRangePicker placeholder="기간을 선택하세요" className="mb-6" />
      <SectionCards />
      <div className="border rounded-lg p-4 shadow-[0_0_6px_rgba(0,0,0,0.06)] bg-gradient-to-b from-white to-secondary/60 dark:from-secondary/60 dark:to-background/60 mt-6">
        <UserList />
      </div>
    </div>
  );
}
