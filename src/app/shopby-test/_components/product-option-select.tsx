"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductOption {
  optionNo: number;
  value: string;
  saleType: string;
  buyPrice: number;
}

interface ProductOptionSelectProps {
  options: ProductOption[];
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export function ProductOptionSelect({
  options,
  onValueChange,
  placeholder = "옵션을 선택해주세요",
}: ProductOptionSelectProps) {
  return (
    <div>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.optionNo}
              value={option.optionNo.toString()}
              disabled={option.saleType !== "AVAILABLE"}
            >
              <div className="flex justify-between items-center w-full">
                <span>{option.value}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {option.saleType !== "AVAILABLE" && (
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
