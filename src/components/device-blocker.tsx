"use client";

import { ReactNode } from "react";
import { CardContent } from "@/components/ui/card";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export default function DeviceBlocker({
  supported,
  children,
}: {
  supported: "fromDesktop" | "fromTablet" | "fromMobile";
  children: ReactNode;
}) {
  const isMobile = useBreakpoint({ is: "mobile" });
  const isTablet = useBreakpoint({ is: "tablet" });
  const isDesktop = useBreakpoint({ is: "desktop" });

  let isSupported = false;
  if (supported === "fromDesktop") {
    isSupported = isDesktop; // 데스크탑만 지원
  } else if (supported === "fromTablet") {
    isSupported = isTablet || isDesktop; // 태블릿 이상 지원
  } else {
    isSupported = isMobile || isTablet || isDesktop; // 모든 디바이스 지원
  }

  return isSupported ? children : <NotSupportedMessage />;
}

function NotSupportedMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 mx-auto">
      <div className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-6">
            현재 기기는 사용할 수 없는 화면입니다.
          </p>
        </CardContent>
      </div>
    </div>
  );
}
