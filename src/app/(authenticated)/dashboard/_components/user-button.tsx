"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLogout } from "@irsyadadl/paranoid";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export const UserButton = async ({ session }: { session: Session | null }) => {
  const [loading, setLoading] = useState(false);

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Internal server error",
      );
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 hover:cursor-pointer lg:h-7 lg:w-7">
          <AvatarImage
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={handleSignOut}
          disabled={loading}
        >
          {loading ? (
            <span>Signing out...</span>
          ) : (
            <>
              <IconLogout className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
