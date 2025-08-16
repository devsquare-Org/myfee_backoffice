"use client";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ROUTES } from "@/lib/routes-config";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// 경로에 따른 라벨 매핑
const ROUTE_LABELS: Record<string, string> = {
  "/": "대시보드",
  "/challenge-list": "챌린지 관리",
  "/challenge-review-list": "챌린지 리뷰 관리",
  "/user-list": "유저 관리",
  "/notification": "푸시 알림",
  "/coupon": "쿠폰 관리",
  "/content": "콘텐츠 관리",
};

function getRouteInfo(path: string) {
  const fullPath = `/${path}`;
  return {
    path: ROUTE_LABELS[fullPath] ? fullPath : "#",
    label: ROUTE_LABELS[fullPath] || "Not Found",
  };
}

export function Header() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const displayPaths = [...paths];
  const detailPage = ["user-list", "challenge-list", "challenge-review-list"];

  detailPage.forEach((page) => {
    if (pathname.startsWith(`/${page}/`) && paths.length > 1) {
      displayPaths[displayPaths.length - 1] = "detail";
    }
  });

  return (
    <header className="sticky w-full bg-secondary/20 top-0 backdrop-blur-lg flex items-center justify-between border-b py-2 px-8 z-50">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="cursor-pointer" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                href={ROUTES.DASHBOARD}
                className={
                  pathname === ROUTES.DASHBOARD
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {ROUTE_LABELS[ROUTES.DASHBOARD]}
              </Link>
              {displayPaths.length > 0 && (
                <ChevronRight className="h-4 w-4 ml-1.5" />
              )}
            </BreadcrumbItem>

            {displayPaths.map((path: string, index: number) => {
              const routeInfo = getRouteInfo(path);

              return (
                <BreadcrumbItem key={`${path}-${index}`}>
                  <Link
                    href={routeInfo.path}
                    className={
                      index === displayPaths.length - 1
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground transition-colors"
                    }
                  >
                    {routeInfo.label}
                  </Link>
                  {index < displayPaths.length - 1 && (
                    <ChevronRight className="h-4 w-4 ml-1.5" />
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </header>
  );
}
