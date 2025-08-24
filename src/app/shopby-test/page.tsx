import {
  fetchProductDetail,
  fetchProductOptions,
} from "@/app/shopby-test/_action/data";
import { ProductOptionsClient } from "@/app/shopby-test/_components/product-options-client";
import { ImageCarousel } from "@/app/shopby-test/_components/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ShopByTestPage() {
  const data = await fetchProductDetail();
  const optionData = await fetchProductOptions();

  return (
    <div className="grid grid-cols-2 gap-8 p-4">
      <Tabs defaultValue="product">
        <TabsList>
          <TabsTrigger value="product">Product Detail</TabsTrigger>
          <TabsTrigger value="options">Product Options</TabsTrigger>
        </TabsList>
        <TabsContent value="product">
          <pre className="w-full overflow-scroll bg-secondary p-4 text-xs">
            <p className="text-2xl font-medium mb-4">Shopby api response</p>
            {JSON.stringify(data, null, 2)}
          </pre>
        </TabsContent>
        <TabsContent value="options">
          <pre className="w-full overflow-scroll bg-secondary p-4 text-xs">
            <p className="text-2xl font-medium mb-4">Shopby api response</p>
            {JSON.stringify(optionData, null, 2)}
          </pre>
        </TabsContent>
      </Tabs>

      <div className="max-w-[380px] mx-auto border-4 border-black rounded-4xl shadow-[4px_6px_12px_rgba(0,0,0,0.3)] h-[800px] flex flex-col sticky top-20 overflow-hidden">
        <div className="bg-secondary rounded-t-4xl p-4 text-xs font-semibold flex-shrink-0">
          Safe Area
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-4 pb-16">
            {data.baseInfo.imageUrls.length > 0 && (
              <ImageCarousel
                imageUrls={data.baseInfo.imageUrls}
                className="mb-4"
              />
            )}
            <h1 className="text-2xl font-medium mb-2">
              {data.baseInfo.productName}
            </h1>
            <p className="text-base font-medium mb-2">
              {optionData.multiLevelOptions
                .reduce((acc, curr) => acc + curr.addPrice, 0)
                .toLocaleString()}
              원
            </p>
            <div dangerouslySetInnerHTML={{ __html: data.baseInfo.content }} />
            <ProductOptionsClient
              optionData={optionData}
              productDetail={data}
            />
          </div>
        </div>

        <div className="bg-secondary rounded-b-4xl p-4 text-xs font-semibold sticky bottom-0 left-0 right-0">
          Safe Area
        </div>
      </div>
    </div>
  );
}
