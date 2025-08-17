import { PageHeader } from "@/components/page-header";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Dashboard } from "@/components/dashboard";

type Props = {
  searchParams: Promise<{
    startDate: string;
    endDate: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { startDate, endDate } = await searchParams;
  return (
    <div>
      <PageHeader
        title="대시보드"
        description="마이피 앱 데이터를 확인할 수 있습니다."
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-200">
            <Loader2 size={40} className="animate-spin" />
          </div>
        }
      >
        <Dashboard startDate={startDate} endDate={endDate} />
      </Suspense>
    </div>
  );
}
