import BannerDelete from "@/app/(private)/banner/[bannerId]/_components/banner-delete";
import BannerDetailEdit from "@/app/(private)/banner/[bannerId]/_components/banner-detail-edit";
import { getBannerDetail } from "@/app/(private)/banner/_action/data";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  params: Promise<{
    bannerId: string;
  }>;
};

export default async function BannerDetail({ params }: Props) {
  const { bannerId } = await params;
  const { data } = await getBannerDetail({ id: bannerId.toString() });

  return (
    <div>
      <PageHeader
        title="배너 상세 정보"
        description="배너 정보를 수정할 수 있습니다."
      />
      <Tabs defaultValue="detail">
        <TabsList>
          <TabsTrigger value="detail">수정</TabsTrigger>
          <TabsTrigger value="delete">삭제</TabsTrigger>
        </TabsList>
        <TabsContent value="detail">
          <BannerDetailEdit data={data} />
        </TabsContent>
        <TabsContent value="delete">
          <BannerDelete id={bannerId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
