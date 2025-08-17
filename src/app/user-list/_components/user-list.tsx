import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function UserList() {
  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">이미지</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>닉네임</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>가입일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>2021-01-01</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
