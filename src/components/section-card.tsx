"use client";

export function SectionCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 rounded-lg border shadow-[0_0_6px_rgba(0,0,0,0.1)] bg-gradient-to-b from-white to-secondary">
        <p className="text-sm text-muted-foreground mb-1 font-medium">
          가입자 수
        </p>
        <p className="text-lg font-medium tabular-nums mb-3">13명</p>
        <p className="text-xs text-muted-foreground font-medium">
          오늘 가입자 수
        </p>
      </div>
      <div className="p-4 rounded-lg border shadow-[0_0_6px_rgba(0,0,0,0.1)] bg-gradient-to-b from-white to-secondary">
        <p className="text-sm text-muted-foreground mb-1 font-medium">
          지급된 포인트
        </p>
        <p className="text-lg font-medium tabular-nums mb-3">27,000원</p>
        <p className="text-xs text-muted-foreground font-medium">
          오늘 지급된 포인트
        </p>
      </div>
      <div className="p-4 rounded-lg border shadow-[0_0_6px_rgba(0,0,0,0.1)] bg-gradient-to-b from-white to-secondary">
        <p className="text-sm text-muted-foreground mb-1 font-medium">
          누적 가입자 수
        </p>
        <p className="text-lg font-medium tabular-nums mb-3">13명</p>
        <p className="text-xs text-muted-foreground font-medium">
          조회한 기간 가입자 수
        </p>
      </div>
      <div className="p-4 rounded-lg border shadow-[0_0_6px_rgba(0,0,0,0.1)] bg-gradient-to-b from-white to-secondary">
        <p className="text-sm text-muted-foreground mb-1 font-medium">
          누적 지급된 포인트
        </p>
        <p className="text-lg font-medium tabular-nums mb-3">27,000원</p>
        <p className="text-xs text-muted-foreground font-medium">
          조회한 기간 지급된 포인트
        </p>
      </div>
    </div>
  );
}
