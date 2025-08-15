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
import { ROUTES } from "@/lib/routes-config";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = ROUTES;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <SahdcnSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MyFee Backoffice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.entries(items).map(([key, value]) => (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-colors rounded-md hover:bg-border hover:text-primary text-sm",
                      pathname === value.path && "bg-border text-primary"
                    )}
                  >
                    <a href={value.path}>
                      <span className="font-medium">{value.label}</span>
                    </a>
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
