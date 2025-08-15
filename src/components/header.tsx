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

function getRouteByPath(path: string) {
  return Object.values(ROUTES).find((route) => route.path === `/${path}`);
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
                href={ROUTES.DASHBOARD.path}
                className={
                  pathname === ROUTES.DASHBOARD.path
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {ROUTES.DASHBOARD.label}
              </Link>
              {displayPaths.length > 0 && (
                <ChevronRight className="h-4 w-4 ml-1.5" />
              )}
            </BreadcrumbItem>

            {displayPaths.map((path: string, index: number) => {
              const route = getRouteByPath(path);
              const href = route?.path || "#";
              const label = route?.label || "Not Found";

              return (
                <BreadcrumbItem key={`${path}-${index}`}>
                  <Link
                    href={href}
                    className={
                      index === displayPaths.length - 1
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground transition-colors"
                    }
                  >
                    {label}
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
