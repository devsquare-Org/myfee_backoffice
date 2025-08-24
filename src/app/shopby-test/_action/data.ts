'use server';

interface ProductOption {
  optionNo: number;
  label: string;
  value: string;
  addPrice: number;
  saleCnt: number;
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

interface ProductDetailResponse {
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

export async function fetchProductDetail(): Promise<ProductDetailResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const clientId = process.env.CLIENT_ID;

  if (!baseUrl || !clientId) {
    throw new Error('환경변수가 설정되지 않았습니다.');
  }

  try {
    const response = await fetch(`https://${baseUrl}/products/131485375`, {
      method: 'GET',
      headers: {
        Version: '1.0',
        'Content-Type': 'application/json',
        clientId: clientId,
        platform: 'PC',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Shopby API 호출 실패:', error);
    throw new Error('상품 목록을 가져오는데 실패했습니다.');
  }
}

export async function fetchProductOptions(): Promise<ProductOptionsResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const clientId = process.env.CLIENT_ID;

  if (!baseUrl || !clientId) {
    throw new Error('환경변수가 설정되지 않았습니다.');
  }

  try {
    const response = await fetch(
      `https://${baseUrl}/products/131485375/options`,
      {
        method: 'GET',
        headers: {
          Version: '1.0',
          'Content-Type': 'application/json',
          clientId: clientId,
          platform: 'PC',
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Shopby API 호출 실패:', error);
    throw new Error('상품 목록을 가져오는데 실패했습니다.');
  }
}
