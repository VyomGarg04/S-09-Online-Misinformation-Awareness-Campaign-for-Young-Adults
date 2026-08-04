"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Search,
  LayoutDashboard,
  FileText,
  Sparkles,
  User,
  GraduationCap,
  Sun,
  Moon,
  LogOut,
  Command,
} from "lucide-react";
import { removeToken } from "@/lib/auth";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigateTo = (path: string) => {
    setOpen(false);
    setQuery("");
    router.push(path);
  };

  const handleLogout = () => {
    setOpen(false);
    removeToken();
    router.push("/login");
  };

  const items = [
    {
      name: "Go to Dashboard",
      category: "Navigation",
      icon: LayoutDashboard,
      action: () => navigateTo("/dashboard"),
    },
    {
      name: "AI Analysis Suite",
      category: "Navigation",
      icon: Sparkles,
      action: () => navigateTo("/analysis"),
    },
    {
      name: "Content Library",
      category: "Navigation",
      icon: FileText,
      action: () => navigateTo("/content"),
    },
    {
      name: "Media Literacy Hub",
      category: "Navigation",
      icon: GraduationCap,
      action: () => navigateTo("/resources"),
    },
    {
      name: "User Profile",
      category: "Navigation",
      icon: User,
      action: () => navigateTo("/profile"),
    },
    {
      name: `Switch Theme to ${theme === "dark" ? "Light Cream" : "Warm Dark"}`,
      category: "Preferences",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setOpen(false);
      },
    },
    {
      name: "Sign Out of Account",
      category: "Account",
      icon: LogOut,
      action: handleLogout,
    },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Trigger Button displayed in Navbar */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search or jump to...</span>
        <span className="sm:hidden">Search</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden gap-0">
          <div className="flex items-center border-b px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 border-0 bg-transparent focus-visible:ring-0 text-sm shadow-none"
              autoFocus
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No matching commands found.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-xs rounded-lg hover:bg-amber-500/10 hover:text-amber-800 dark:hover:text-amber-300 text-foreground transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground flex items-center justify-between">
            <span>Press <kbd className="font-mono">Esc</kbd> to close</span>
            <span>MediaShield Command Palette</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
