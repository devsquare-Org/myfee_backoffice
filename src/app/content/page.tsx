import BannerList from "@/app/content/_components/banner-list";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchBannerList } from "@/app/content/_action/data";
import BannerCreateForm from "@/app/content/_components/banner-create-form";

export default async function Content() {
  const bannerList = await fetchBannerList();

  return (
    <div>
      <PageHeader
        title="콘텐츠 관리"
        description="마이피 앱에 노출되는 콘텐츠 관리 페이지입니다."
      />
      <Tabs defaultValue="banner">
        <TabsList>
          <TabsTrigger value="banner">배너 관리</TabsTrigger>
          <TabsTrigger value="create">배너 추가</TabsTrigger>
        </TabsList>
        <TabsContent value="banner">
          <BannerList bannerList={bannerList.data} />
        </TabsContent>
        <TabsContent value="create" className="max-w-xl">
          <BannerCreateForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
