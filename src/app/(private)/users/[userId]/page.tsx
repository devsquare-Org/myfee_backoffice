import BasicInfo from '@/app/(private)/users/_components/basic-info';
import Challenge from '@/app/(private)/users/_components/challenge';
import Point from '@/app/(private)/users/_components/point';
import { PageHeader } from '@/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function UserListPage({ params }: Props) {
  const { userId } = await params;
  const userDetail = {
    nickname: 'nickname',
    name: 'name',
    phone: '01012345678',
    email: 'sole@lifeb.kr',
  };

  const pointHistory = [
    {
      id: '1',
      point: 3500,
      reason: '환전',
      type: '차감',
      createdAt: '2023-10-05 12:00:00',
    },
    {
      id: '2',
      reason: '챌린지 중간 리워드',
      point: 1000,
      createdAt: '2023-10-04 12:00:00',
      adminId: 'sole',
      type: '지급',
    },
    {
      id: '3',
      point: 500,
      reason: '챌린지 참여 리워드',
      createdAt: '2023-10-03 12:00:00',
      type: '지급',
    },
    {
      id: '4',
      point: 2000,
      reason: '가입 축하 리워드',
      createdAt: '2023-10-02 12:00:00',
      type: '지급',
    },
  ];

  return (
    <div>
      <PageHeader
        title='유저 상세 정보'
        description='유저 상세 정보를 확인할 수 있습니다.'
      />
      <Tabs defaultValue='detail'>
        <TabsList>
          <TabsTrigger value='detail'>기본 정보</TabsTrigger>
          <TabsTrigger value='point'>포인트 내역</TabsTrigger>
          <TabsTrigger value='challenge'>챌린지 내역</TabsTrigger>
        </TabsList>
        <TabsContent value='detail'>
          <BasicInfo
            email={userDetail.email}
            name={userDetail.name}
            nickname={userDetail.nickname}
            phone={userDetail.phone}
            point={15000}
            shopbyUserId='122700946'
          />
        </TabsContent>
        <TabsContent value='point'>
          <Point pointHistory={pointHistory} />
        </TabsContent>
        <TabsContent value='challenge'>
          <Challenge />
        </TabsContent>
      </Tabs>
    </div>
  );
}
