'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  totalItems: number;
  searchParams?: Record<string, string | undefined>;
}

export function PaginationControls({
  page,
  pageSize,
  totalItems,
  searchParams = {},
}: PaginationControlsProps) {
  const searchParamsObj = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  );

  function handlePageChange(pageNum: number) {
    if (pageNum < 1 || pageNum > totalPages || pageNum === page) {
      // 유효하지 않은 페이지 번호이거나 현재 페이지와 같은 경우 처리하지 않음
      return;
    }

    const params = new URLSearchParams(searchParamsObj);

    // 현재 검색 파라미터 유지
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page' && key !== 'pageSize') {
        params.set(key, value);
      }
    });

    // 페이지네이션 파라미터 설정
    params.set('page', pageNum.toString());

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='mt-4'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && handlePageChange(page - 1)}
              className={
                page <= 1
                  ? 'pointer-events-none opacity-50 hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
                  : 'cursor-pointer hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
              }
            />
          </PaginationItem>

          {Array.from(
            { length: Math.min(5, Math.max(1, totalPages)) },
            (_, i) => {
              // 페이지 번호 계산
              let pageNumber;
              if (totalPages <= 5) {
                // 총 페이지가 5개 이하면 순서대로 표시
                pageNumber = i + 1;
              } else if (page <= 3) {
                // 현재 페이지가 1~3이면 1~5 표시
                pageNumber = i + 1;
              } else if (page >= totalPages - 2) {
                // 현재 페이지가 마지막 3페이지 안에 있으면 마지막 5페이지 표시
                pageNumber = totalPages - 4 + i;
              } else {
                // 그 외의 경우 현재 페이지 중심으로 앞뒤 2페이지씩 표시
                pageNumber = page - 2 + i;
              }

              // totalPages가 0인 경우 페이지 번호가 1을 초과하지 않도록 함
              if (totalPages === 0 && pageNumber > 1) {
                return null;
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={pageNumber === page}
                    className='cursor-pointer hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && handlePageChange(page + 1)}
              className={
                page >= totalPages
                  ? 'pointer-events-none opacity-50 hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
                  : 'cursor-pointer hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
