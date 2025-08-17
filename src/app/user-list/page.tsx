import { fetchUserList } from "@/app/user-list/_action/data";
import { UserList } from "@/app/user-list/_components/user-list";
import { DateRangePicker } from "@/components/date-range-picker";
import { PageHeader } from "@/components/page-header";
import SearchInput from "@/components/search-input";

type Props = {
  searchParams: Promise<{
    startDate: string;
    endDate: string;
  }>;
};

export default async function UserPage({ searchParams }: Props) {
  const { startDate, endDate } = await searchParams;
  const { data } = await fetchUserList({ startDate, endDate });

  return (
    <div>
      <PageHeader
        title="유저 목록"
        description="유저 목록을 확인할 수 있습니다."
      />

      <div className="flex items-center gap-2 mb-4 max-w-xl">
        <SearchInput placeholder="이름으로 검색" searchParamsName="search" />
        <DateRangePicker placeholder="기간을 선택하세요" />
      </div>
      <UserList userList={data} />
    </div>
  );
}
