'use client';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props = {
  challengeHistory: {
    id: string;
    name: string;
    reviewCount: number;
    result: string;
    createdAt: string;
  }[];
};

export default function Challenge({ challengeHistory }: Props) {
  return (
    <Table className='text-xs'>
      <TableHeader>
        <TableRow>
          <TableHead>챌린지명</TableHead>
          <TableHead>인증 횟수</TableHead>
          <TableHead>결과</TableHead>
          <TableHead>참가일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {challengeHistory.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.reviewCount.toLocaleString()}</TableCell>
            <TableCell>
              {item.result === '성공' ? (
                <Badge variant='outline'>성공</Badge>
              ) : (
                <Badge variant='secondary'>실패</Badge>
              )}
            </TableCell>
            <TableCell>{item.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
