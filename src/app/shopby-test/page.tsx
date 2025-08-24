import {
  fetchProductDetail,
  fetchProductOptions,
} from '@/app/shopby-test/_action/data';
import { ProductOptionsClient } from '@/app/shopby-test/_components/product-options-client';

export default async function ShopByTestPage() {
  const data = await fetchProductDetail();
  const optionData = await fetchProductOptions();

  console.log('!!!Product Detail:!!!', data);
  console.log('!!!Shopby Options:!!!', optionData);
  return (
    <div className='container mx-auto p-6 space-y-8'>
      <h1 className='text-2xl font-bold'>Shop By Test Page</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-xl font-semibold mb-4'>상품 상세</h2>
          <div dangerouslySetInnerHTML={{ __html: data.baseInfo.content }} />
        </div>

        <ProductOptionsClient optionData={optionData} productDetail={data} />
      </div>
    </div>
  );
}
