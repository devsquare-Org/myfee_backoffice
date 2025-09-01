"use client";

import * as React from "react";
import { Smile, SunIcon, MoonIcon } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { menu } from "@/components/sidebar";
import { useTheme } from "next-themes";
import { logoutAction } from "@/app/signin/_action/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function GlobalCommand() {
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  }

  function goToRoute(path: string) {
    router.push(path);
    setOpen(false);
  }

  function logout() {
    logoutAction();
    setOpen(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="검색어를 입력하세요." />
      <CommandList>
        <CommandEmpty>결과가 없습니다.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={toggleTheme}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            <span className="text-xs font-medium">테마 변경</span>
          </CommandItem>
          <CommandItem onSelect={logout}>
            <Smile />
            <span className="text-xs font-medium">로그아웃</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Pages">
          {menu.map((value) => (
            <CommandItem
              key={value.path}
              onSelect={() => goToRoute(value.path)}
            >
              <value.icon />
              <span className="text-xs font-medium">{value.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
