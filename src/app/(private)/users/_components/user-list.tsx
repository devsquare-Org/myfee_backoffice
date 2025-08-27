import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { FileText } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/lib/routes-config";

type Props = {
  userList: {
    id: string;
    name: string;
    nickname: string;
    email: string;
    image: string;
    createdAt: string;
  }[];
};

export function UserList({ userList }: Props) {
  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">이미지</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>닉네임</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>가입일</TableHead>
          <TableHead className="sr-only">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.nickname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.createdAt}</TableCell>
            <TableCell className="text-right align-middle">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-7 h-7">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg z-[9999]"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="px-2 py-1.5 text-left text-xs font-medium">
                    <p>유저 관리</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={`${ROUTES.USERS}/${user.id}`}>
                      <DropdownMenuItem className="w-full cursor-pointer text-xs">
                        <div className="mr-2">
                          <FileText size={16} />
                        </div>
                        상세 보기
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
