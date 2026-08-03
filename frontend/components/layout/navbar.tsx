"use client";

import { Bell, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { removeToken } from "@/lib/auth";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  function logout() {
    removeToken();
    router.replace("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-8">

      <div>
        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <Button
          variant="destructive"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>

      </div>

    </header>
  );
}