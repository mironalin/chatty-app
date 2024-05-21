"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { clsx } from "clsx";

import { Button } from "@/components/ui/button";

export function ThemeToggleMobile() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className={clsx(`flex p-8 gap-x-3 rounded-md text-sm leading-6 font-medium w-full justify-center`)}
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-6 w-6 shrink-0 dark:hidden" />
      <Moon className="hidden h-6 w-6 shrink-0 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
