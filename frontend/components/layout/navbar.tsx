"use client";

import { LogOut, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/lib/auth";
import { CommandPalette } from "@/components/layout/command-palette";
import { navigation } from "@/components/layout/sidebar";
import { Logo } from "@/components/branding";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function logout() {
    removeToken();
    toast.success("Logged out successfully");
    router.replace("/login");
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Logo />
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground hidden sm:block">
              MediaShield Workspace
            </h1>
          </div>

          <div className="hidden sm:block">
            <CommandPalette />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="sm:hidden">
            <CommandPalette />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
            aria-label="Toggle theme mode"
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-amber-700" />
              ))}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="text-xs text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-card p-6 shadow-2xl transition-transform animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between border-b pb-4">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 space-y-1.5 py-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-amber-700 text-white dark:bg-amber-600 font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/30 justify-start gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out of workspace
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}