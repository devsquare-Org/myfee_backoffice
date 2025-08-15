"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative w-7 h-7 cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="w-[1.2rem] h-[1.2rem] scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
      <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] scale-100 transition-transform ease-in-out duration-500 dark:scale-0" />
      <span className="sr-only">Switch Theme</span>
    </Button>
  );
}
