"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Search,
  User,
  GraduationCap,
} from "lucide-react";
import { Logo } from "@/components/branding";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Analysis",
    href: "/analysis",
    icon: Search,
  },
  {
    name: "Content",
    href: "/content",
    icon: FileText,
  },
  {
    name: "Literacy Hub",
    href: "/resources",
    icon: GraduationCap,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-card lg:flex lg:flex-col">
      <div className="border-b p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors text-sm font-medium",
                isActive
                  ? "bg-amber-700 text-white dark:bg-amber-600 font-semibold shadow-xs"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}