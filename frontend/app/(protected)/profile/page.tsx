"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth";
import { User } from "@/types/auth";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProfileSettings } from "@/components/profile/profile-settings";
import { User as UserIcon } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-2">
          <UserIcon className="h-6 w-6 text-amber-600 dark:text-amber-500" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            User Profile & Preferences
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account identity, view fact-checking metrics, and configure workspace settings.
        </p>
      </div>

      {/* Main Profile Stack */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-44 animate-pulse rounded-2xl bg-muted/40" />
          <div className="h-32 animate-pulse rounded-2xl bg-muted/40" />
        </div>
      ) : (
        <div className="space-y-6">
          <ProfileCard user={user} />
          <ProfileStats />
          <ProfileSettings />
        </div>
      )}
    </div>
  );
}