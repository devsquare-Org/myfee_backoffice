import { SectionCards } from "@/components/section-card";
import { DateRangePicker } from "@/components/date-range-picker";

export function Dashboard() {
  return (
    <div>
      <DateRangePicker placeholder="기간을 선택하세요" className="mb-4" />
      <SectionCards />
    </div>
  );
}
