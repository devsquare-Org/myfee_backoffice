"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-4xl font-bold mb-2">404</p>
          <p className="text-muted-foreground mb-6">
            찾고 있는 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            뒤로가기
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
