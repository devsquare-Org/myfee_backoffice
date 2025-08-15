import type { Metadata } from "next";
import { dm_sans } from "@/style/fonts/fonts";
import "../style/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "MyFee Backoffice",
  description: "MyFee Backoffice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = true;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dm_sans.className} antialiased`}>
        {user ? (
          <ThemeProvider defaultTheme="system" attribute="class">
            <SidebarProvider>
              <Sidebar />
              <main className="w-full">
                <Header />
                <div className="p-8">{children}</div>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        ) : (
          <div>Login Page</div>
        )}
      </body>
    </html>
  );
}
