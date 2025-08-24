'use client';

import { useState } from 'react';
import { ProductOptionSelect } from './product-option-select';

interface ProductOption {
  optionNo: number;
  label: string;
  value: string;
  addPrice: number;
  stockCnt: number;
  reservationStockCnt: number;
  saleType: string;
  main: boolean;
  images: string[];
  optionManagementCd: string;
  buyPrice: number;
  forcedSoldOut: boolean;
  rentalInfo: unknown[];
  extraManagementCd?: string;
  isRequiredOption: boolean;
  children?: unknown;
}

interface ProductOptionsResponse {
  type: string;
  selectType: string;
  labels: string[];
  multiLevelOptions: ProductOption[];
  flatOptions: ProductOption[];
  inputs: unknown[];
  displayableStock: boolean;
  productSalePrice: number;
  immediateDiscountAmt: number;
  additionalProducts: unknown[];
}

interface ProductLimitations {
  minBuyCnt: number;
  maxBuyPersonCnt: number;
  maxBuyTimeCnt: number;
  maxBuyDays: number;
  maxBuyPeriodCnt: number;
  memberOnly: boolean;
  canAddToCart: boolean;
  refundable: boolean;
  nonRefundTypes: string[];
  naverPayHandling: boolean;
}

interface ProductDetail {
  baseInfo: {
    productNo: number;
    productName: string;
    content: string;
    imageUrls: string[];
    [key: string]: unknown;
  };
  limitations: ProductLimitations;
  stock: {
    saleCnt: number;
    stockCnt: number;
    mainStockCnt: number;
  };
  price: {
    salePrice: number;
    immediateDiscountAmt: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface ProductOptionsClientProps {
  optionData: ProductOptionsResponse;
  productDetail: ProductDetail;
}

export function ProductOptionsClient({
  optionData,
  productDetail,
}: ProductOptionsClientProps) {
  // limitations에서 실제 구매 수량 제한 값 가져오기
  const minBuyCnt = productDetail.limitations?.minBuyCnt;
  const maxBuyPersonCnt = productDetail.limitations?.maxBuyPersonCnt;
  
  // minBuyCnt 또는 maxBuyPersonCnt 중 큰 값을 사용, 없으면 기본 1개
  const selectCount = Math.max(minBuyCnt || 1, maxBuyPersonCnt || 1);
  
  console.log('minBuyCnt:', minBuyCnt);
  console.log('maxBuyPersonCnt:', maxBuyPersonCnt);
  console.log('selectCount:', selectCount);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(selectCount).fill('')
  );

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...selectedOptions];
    newOptions[index] = value;
    setSelectedOptions(newOptions);
    console.log(`${index + 1}번째 선택:`, value);
    console.log('전체 선택 상황:', newOptions);
  };

  const getOrdinalLabel = (index: number) => {
    const ordinals = [
      '첫 번째',
      '두 번째',
      '세 번째',
      '네 번째',
      '다섯 번째',
      '여섯 번째',
      '일곱 번째',
      '여덟 번째',
      '아홉 번째',
      '열 번째',
    ];
    return ordinals[index] || `${index + 1}번째`;
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>상품 옵션</h2>

      <div className='bg-gray-50 p-4 rounded-lg'>
        <p className='text-sm text-gray-600 mb-2'>
          기본 가격: {optionData.productSalePrice.toLocaleString()}원
        </p>
        {optionData.immediateDiscountAmt > 0 && (
          <p className='text-sm text-red-600 mb-2'>
            즉시 할인: -{optionData.immediateDiscountAmt.toLocaleString()}원
          </p>
        )}
        <p className='text-sm text-gray-600'>선택할 개수: {selectCount}개</p>
      </div>

      {Array.from({ length: selectCount }, (_, index) => (
        <div key={index} className='border-l-4 border-blue-200 pl-4'>
          {optionData.labels.map((label, labelIndex) => (
            <ProductOptionSelect
              key={`${index}-${labelIndex}`}
              label={`${getOrdinalLabel(index)} ${label}`}
              options={optionData.flatOptions.filter(
                (option) => option.label === label
              )}
              placeholder={`${getOrdinalLabel(
                index
              )} ${label}을(를) 선택해주세요`}
              onValueChange={(value) => handleOptionChange(index, value)}
            />
          ))}
        </div>
      ))}

      <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
        <h3 className='font-medium mb-2'>옵션 정보</h3>
        <p className='text-sm text-gray-600'>타입: {optionData.type}</p>
        <p className='text-sm text-gray-600'>
          선택 방식: {optionData.selectType}
        </p>
        <p className='text-sm text-gray-600'>
          총 옵션 수: {optionData.flatOptions.length}개
        </p>
        <p className='text-sm text-gray-600'>
          최소 구매 개수: {minBuyCnt || 'N/A'}
        </p>
        <p className='text-sm text-gray-600'>
          최대 구매 개수: {maxBuyPersonCnt || 'N/A'}
        </p>
      </div>

      {selectedOptions.some((option) => option) && (
        <div className='mt-6 p-4 bg-green-50 rounded-lg'>
          <h3 className='font-medium mb-2'>선택된 옵션</h3>
          {selectedOptions.map(
            (option, index) =>
              option && (
                <p key={index} className='text-sm text-gray-600'>
                  {getOrdinalLabel(index)}:{' '}
                  {
                    optionData.flatOptions.find(
                      (opt) => opt.optionNo.toString() === option
                    )?.value
                  }
                </p>
              )
          )}
        </div>
      )}
    </div>
  );
}
