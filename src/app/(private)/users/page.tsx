import { fetchUserList } from '@/app/(private)/users/_action/data';
import { UserList } from '@/app/(private)/users/_components/user-list';
import { PageHeader } from '@/components/page-header';
import SearchInput from '@/components/search-input';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

type Props = {
  searchParams: Promise<{
    startDate: string;
    endDate: string;
  }>;
};

export default async function UserPage({ searchParams }: Props) {
  const { startDate, endDate } = await searchParams;
  const { data } = await fetchUserList({ startDate, endDate });

  return (
    <div>
      <PageHeader
        title='유저 목록'
        description='유저 목록을 확인할 수 있습니다.'
      />
      <Suspense fallback={<Skeleton className='w-full h-10' />}>
        <SearchInput
          placeholder='닉네임 또는 전화번호로 검색'
          searchParamsName='search'
          className='mb-4 max-w-[280px]'
        />
      </Suspense>
      <UserList userList={data} />
    </div>
  );
}
