"use client";

import { bannerListSchema } from "@/app/banner/_action/schema";
import { z } from "zod";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableRow, TableCell } from "@/components/ui/table";
import { FileText, GripHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/lib/routes-config";

type Banner = z.infer<typeof bannerListSchema>[0];

export function SortableRow({ banner }: { banner: Banner }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: banner.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={{ ...style, touchAction: "manipulation" }}
      {...attributes}
    >
      <TableCell
        className="text-center align-middle  cursor-grab active:cursor-grabbing touch-none select-none"
        {...listeners}
        style={{ touchAction: "none" }}
      >
        <div className="flex items-center justify-center">
          <GripHorizontal className="w-4 h-4 text-gray-500" />
        </div>
      </TableCell>
      <TableCell>
        <Tooltip delayDuration={600}>
          <TooltipTrigger asChild>
            <div className="w-12 h-8 rounded-sm flex items-center justify-center overflow-hidden cursor-pointer">
              <Image
                src={banner.image}
                alt={banner.title}
                width={48}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-2" side="top" sideOffset={10}>
            <div className="relative">
              <Image
                src={banner.image}
                alt={banner.title}
                width={200}
                height={150}
                className="object-cover rounded-md"
              />
            </div>
          </TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell className="font-medium">{banner.title}</TableCell>
      <TableCell className="max-w-[200px]">
        <div className="truncate">
          <Link
            target="_blank"
            href={banner.linkUrl}
            className="text-blue-600 hover:underline"
          >
            {banner.linkUrl}
          </Link>
        </div>
      </TableCell>
      <TableCell>{banner.createdAt}</TableCell>
      <TableCell>{banner.updatedAt}</TableCell>
      <TableCell className="text-right align-middle">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-7 h-7">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-left text-xs font-medium">
              <p>배너 관리</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`${ROUTES.BANNER}/${banner.id}`}>
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
  );
}
