'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductOption {
  optionNo: number;
  label: string;
  value: string;
  addPrice: number;
  stockCnt: number;
  saleType: string;
  buyPrice: number;
}

interface ProductOptionSelectProps {
  options: ProductOption[];
  label: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export function ProductOptionSelect({
  options,
  label,
  onValueChange,
  placeholder = '옵션을 선택해주세요',
}: ProductOptionSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.optionNo}
              value={option.optionNo.toString()}
              disabled={option.saleType !== 'AVAILABLE' || option.stockCnt <= 0}
            >
              <div className="flex justify-between items-center w-full">
                <span>{option.value}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {option.addPrice > 0 && (
                    <span className="text-orange-600">
                      +{option.addPrice.toLocaleString()}원
                    </span>
                  )}
                  <span>재고: {option.stockCnt}개</span>
                  {option.saleType !== 'AVAILABLE' && (
                    <span className="text-red-500">품절</span>
                  )}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}