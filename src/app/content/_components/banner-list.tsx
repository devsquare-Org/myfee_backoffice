"use client";

import { z } from "zod";
import { bannerListSchema } from "@/app/content/_action/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { changeOrderAction } from "@/app/content/_action/action";
import { SortableRow } from "@/app/content/_components/sortable-row";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Flag } from "lucide-react";
import { AlertTitle } from "@/components/ui/alert";
import { useAction } from "next-safe-action/hooks";

type BannerListProps = {
  bannerList: z.infer<typeof bannerListSchema>;
};

export default function BannerList({ bannerList }: BannerListProps) {
  const [items, setItems] = useState<typeof bannerList>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const { execute, isExecuting } = useAction(changeOrderAction, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: ({ error: { serverError } }) => {
      toast.error(serverError?.message);
      handleResetOrder();
    },
  });

  useEffect(() => {
    const sortedItems = bannerList.sort((a, b) => a.order - b.order);
    setItems(sortedItems);
    setHasChanges(false);
  }, [bannerList]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      setHasChanges(true);
    }
  }

  async function handleSaveOrder() {
    if (!hasChanges) return;

    const updateData = items.map((item, index) => ({
      id: item.id,
      order: index + 1,
    }));

    execute(updateData);

    setHasChanges(false);
  }

  function handleResetOrder() {
    const sortedItems = bannerList.sort((a, b) => a.order - b.order);
    setItems(sortedItems);
    setHasChanges(false);
  }

  return (
    <div className="space-y-4">
      {hasChanges && (
        <Alert className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Flag size={16} />
            <AlertTitle>
              배너 순서가 변경되었습니다. 저장하시겠습니까?
            </AlertTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={handleResetOrder}
              disabled={isExecuting}
            >
              취소
            </Button>
            <Button size="lg" onClick={handleSaveOrder} disabled={isExecuting}>
              {isExecuting ? <Loader2 className="" /> : "저장"}
            </Button>
          </div>
        </Alert>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">순서</TableHead>
              <TableHead>이미지</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>링크</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead>수정일</TableHead>
              <TableHead className="sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  배너가 없습니다.
                </TableCell>
              </TableRow>
            )}
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((banner) => (
                <SortableRow key={banner.id} banner={banner} />
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </DndContext>
    </div>
  );
}
