import { UserList } from "@/app/user-list/_components/user-list";
import { PageHeader } from "@/components/page-header";

export default function UserPage() {
  return (
    <div>
      <PageHeader
        title="유저 목록"
        description="유저 목록을 확인할 수 있습니다."
      />
      <UserList />
    </div>
  );
}
