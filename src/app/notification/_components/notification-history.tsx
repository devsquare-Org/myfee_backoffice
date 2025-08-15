"use client";

import { notificationHistorySchema } from "@/app/notification/_action/shcema";
import { CustomAlert } from "@/components/custom-alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as z from "zod";

export default function NotificationHistory({
  notificationHistory,
}: {
  notificationHistory: z.infer<typeof notificationHistorySchema>;
}) {
  return (
    <div>
      {notificationHistory.length === 0 ? (
        <CustomAlert type="simple" title="발송 내역이 없습니다." />
      ) : (
        <Table className="text-xs">
          <TableHeader>
            <TableRow className="font-semibold">
              <TableHead>제목</TableHead>
              <TableHead>내용</TableHead>
              <TableHead>발송일시</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notificationHistory.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.title}</TableCell>
                <TableCell>{notification.content}</TableCell>
                <TableCell>{notification.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
