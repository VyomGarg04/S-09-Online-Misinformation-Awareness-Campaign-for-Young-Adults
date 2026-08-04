"use client";

import { User } from "@/types/auth";
import { UserCheck, Mail, Shield, LogOut, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
  user: User | null;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const getInitials = (name?: string) => {
    if (!name) return "MS";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Avatar Circle */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 text-2xl font-bold text-white shadow-md ring-4 ring-amber-500/20">
          {getInitials(user?.full_name)}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-foreground">
              {user?.full_name || "MediaShield Analyst"}
            </h2>
            {user?.is_verified && (
              <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 gap-1 text-[11px]">
                <UserCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <span>{user?.email || "user@mediashield.org"}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 dark:bg-amber-950/60 px-2 py-1 text-xs font-medium text-amber-800 dark:text-amber-300">
              <Shield className="h-3 w-3" />
              Role: Fact Check Analyst
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
              User ID: #{user?.id ?? "1"}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <KeyRound className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span>Active Session: JWT Authenticated</span>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 text-xs gap-1.5"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out of MediaShield
        </Button>
      </div>
    </div>
  );
}
