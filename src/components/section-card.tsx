import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid grid-cols-4 gap-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>가입자 수</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
            13명
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">오늘 가입자 수</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>지급 포인트</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
            27,000원
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">오늘 지급된 포인트</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>가입자 수</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
            10,234명
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            설정된 기간 동안 가입자 수
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>지급 포인트</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
            3,701,000원
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            설정된 기간 동안 지급된 포인트
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
