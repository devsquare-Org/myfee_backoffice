"use client";

import { useState } from "react";
import { ProductOptionSelect } from "./product-option-select";
import { Button } from "@/components/ui/button";
import { calculatePrice } from "@/app/shopby-test/_action/action";

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
  const [calculatePriceInfo, setCalculatePriceInfo] = useState<
    | {
        optionValue: string;
        orderCount: number;
      }[]
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  // limitations에서 실제 구매 수량 제한 값 가져오기
  const minBuyCnt = productDetail.limitations?.minBuyCnt;
  const maxBuyPersonCnt = productDetail.limitations?.maxBuyPersonCnt;

  // minBuyCnt 또는 maxBuyPersonCnt 중 큰 값을 사용, 없으면 기본 1개
  const selectCount = Math.max(minBuyCnt || 1, maxBuyPersonCnt || 1);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(selectCount).fill("")
  );

  function handleOptionChange(index: number, value: string) {
    const newOptions = [...selectedOptions];
    newOptions[index] = value;
    setSelectedOptions(newOptions);
    console.log(`${index + 1}번째 선택:`, value);
    console.log("전체 선택 상황:", newOptions);
  }

  async function handleBuyClick() {
    setIsLoading(true);
    const res = await calculatePrice(
      selectedOptions,
      productDetail.baseInfo.productNo
    );
    setCalculatePriceInfo(
      res.deliveryGroups[0].orderProducts[0].orderProductOptions.map(
        (option: { optionValue: string; orderCnt: number }) => ({
          optionValue: option.optionValue,
          orderCount: option.orderCnt,
        })
      )
    );
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      {Array.from({ length: selectCount }, (_, index) => (
        <div key={index}>
          {optionData.labels.map((label, labelIndex) => (
            <ProductOptionSelect
              key={`${index}-${labelIndex}`}
              options={optionData.flatOptions.filter(
                (option) => option.label === label
              )}
              placeholder={`${index + 1}번째 ${label}`}
              onValueChange={(value) => handleOptionChange(index, value)}
            />
          ))}
        </div>
      ))}
      <Button
        variant="default"
        className="w-full"
        onClick={handleBuyClick}
        disabled={isLoading || selectedOptions.some((option) => !option)}
      >
        {isLoading ? "구매중..." : "구매하기"}
      </Button>
      {calculatePriceInfo && (
        <div className="space-y-2">
          <h2 className="text-lg font-medium">구매 정보</h2>

          <div className="bg-secondary rounded-md p-4">
            {calculatePriceInfo.map(
              (item: { optionValue: string; orderCount: number }) => (
                <div
                  className="flex justify-between py-2"
                  key={item.optionValue}
                >
                  <p className="text-xs font-semibold">{item.optionValue}</p>
                  <p className="text-xs">{item.orderCount}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
