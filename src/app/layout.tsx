import type { Metadata } from "next";
import { dm_sans } from "@/style/fonts/fonts";
import "@/style/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import DeviceBlocker from "@/components/device-blocker";

export const metadata: Metadata = {
  title: "MyFee Backoffice",
  description: "MyFee Backoffice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dm_sans.className} antialiased`}>
        <ThemeProvider defaultTheme="system" attribute="class">
          <DeviceBlocker supported="fromMobile">
            <Toaster position="bottom-center" duration={2000} />
            {children}
          </DeviceBlocker>
        </ThemeProvider>
      </body>
    </html>
  );
}
