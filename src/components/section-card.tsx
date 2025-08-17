"use client";

import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  userCount: number;
  pointCount: number;
  totalUserCount: number;
  totalPointCount: number;
};

export function SectionCards({
  userCount,
  pointCount,
  totalUserCount,
  totalPointCount,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-6 rounded-2xl border relative">
        <div className="flex items-center gap-2 mb-6 ">
          <p className="text-sm font-bold ">가입자 수</p>
          <Tooltip delayDuration={600}>
            <TooltipTrigger asChild>
              <InfoIcon className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10}>
              오늘 00시 기준 현 시각까지 가입자 수입니다.
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-xl font-bold tabular-nums mb-2">
          {userCount.toLocaleString()}명
        </p>
        <p className="text-xs text-muted-foreground font-bold">
          오늘 가입자 수
        </p>
      </div>
      <div className="p-6 rounded-2xl border">
        <div className="flex items-center gap-2 mb-6 ">
          <p className="text-sm font-bold ">지급된 포인트</p>
          <Tooltip delayDuration={600}>
            <TooltipTrigger asChild>
              <InfoIcon className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10}>
              오늘 00시 기준 현 시각까지 지급된 포인트입니다.
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-xl font-bold tabular-nums mb-2">
          {pointCount.toLocaleString()}원
        </p>
        <p className="text-xs text-muted-foreground font-bold">
          오늘 지급된 포인트
        </p>
      </div>
      <div className="p-6 rounded-2xl border">
        <div className="flex items-center gap-2 mb-6 ">
          <p className="text-sm font-bold ">누적 가입자 수</p>
          <Tooltip delayDuration={600}>
            <TooltipTrigger asChild>
              <InfoIcon className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10}>
              조회한 기간 누적 가입자 수입니다. 날짜 범위를 변경하면 더 긴
              기간을 조회할 수 있습니다.
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-xl font-bold tabular-nums mb-2">
          {totalUserCount.toLocaleString()}명
        </p>
        <p className="text-xs text-muted-foreground font-bold">
          조회한 기간 누적 가입자 수
        </p>
      </div>
      <div className="p-6 rounded-2xl border">
        <div className="flex items-center gap-2 mb-6 ">
          <p className="text-sm font-bold ">누적 지급된 포인트</p>
          <Tooltip delayDuration={600}>
            <TooltipTrigger asChild>
              <InfoIcon className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10}>
              조회한 기간 누적 지급된 포인트입니다. 날짜 범위를 변경하면 더 긴
              기간을 조회할 수 있습니다.
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-xl font-bold tabular-nums mb-2">
          {totalPointCount.toLocaleString()}원
        </p>
        <p className="text-xs text-muted-foreground font-bold">
          조회한 기간 누적 지급된 포인트
        </p>
      </div>
    </div>
  );
}
