import { Dashboard } from "@/components/dashboard";
import { PageHeader } from "@/components/page-header";

export default function Main() {
  return (
    <div>
      <PageHeader
        title="대시보드"
        description="마이피 앱 데이터를 확인할 수 있습니다."
      />
      <Dashboard />
    </div>
  );
}
