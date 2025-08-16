"use client";

import {
  Sidebar as SahdcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes-config";
import {
  Bell,
  CheckCircle,
  Home,
  List,
  SquareMousePointer,
  Tickets,
  User,
} from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const pathname = usePathname();
  const menu = [
    {
      label: "대시보드",
      icon: Home,
      path: ROUTES.DASHBOARD,
    },
    {
      label: "챌린지 관리",
      icon: List,
      path: ROUTES.CHALLENGE_LIST,
    },
    {
      label: "챌린지 인증 관리",
      icon: CheckCircle,
      path: ROUTES.CHALLENGE_REVIEW_LIST,
    },
    {
      label: "유저 관리",
      icon: User,
      path: ROUTES.USER_LIST,
    },
    {
      label: "푸시 알림",
      icon: Bell,
      path: ROUTES.NOTIFICATION,
    },
    {
      label: "쿠폰 관리",
      icon: Tickets,
      path: ROUTES.COUPON,
    },
    {
      label: "콘텐츠 관리",
      icon: SquareMousePointer,
      path: ROUTES.CONTENT,
    },
  ];

  return (
    <SahdcnSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MyFee Backoffice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((value) => (
                <SidebarMenuItem key={value.path}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-colors rounded-md hover:bg-border hover:text-primary text-sm",
                      (value.path === ROUTES.DASHBOARD
                        ? pathname === value.path
                        : pathname.includes(value.path)) &&
                        "bg-border text-primary"
                    )}
                  >
                    <Link href={value.path}>
                      <value.icon className="w-4 h-4 mr-2" />
                      <span className="font-medium">{value.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SahdcnSidebar>
  );
}
