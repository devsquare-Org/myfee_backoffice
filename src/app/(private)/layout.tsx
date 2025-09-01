import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { GlobalCommand } from "@/components/global-command";

export const metadata: Metadata = {
  title: "MyFee Backoffice",
  description: "MyFee Backoffice",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full">
        <Header />
        <div className="p-8">{children}</div>
        <GlobalCommand />
      </main>
    </SidebarProvider>
  );
}
