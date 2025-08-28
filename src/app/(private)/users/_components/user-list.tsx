import { PaginationControls } from '@/components/pagination-controls';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ROUTES } from '@/lib/routes-config';

type Props = {
  startDate?: string;
  endDate?: string;
  search?: string;
  userList: {
    id: string;
    name: string;
    nickname: string;
    email: string;
    image: string;
    createdAt: string;
    phone: string;
  }[];
};

export function UserList({ userList, search, startDate, endDate }: Props) {
  return (
    <>
      <Table className='text-xs'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>이미지</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>닉네임</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>전화번호</TableHead>
            <TableHead>가입일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id} url={`${ROUTES.USERS}/${user.id}`}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {startDate && endDate && search && (
        <PaginationControls
          page={1}
          pageSize={10}
          totalItems={100}
          searchParams={{ search, startDate, endDate }}
        />
      )}
    </>
  );
}
