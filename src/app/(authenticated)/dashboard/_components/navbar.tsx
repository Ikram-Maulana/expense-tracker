"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { authenticatedNav } from "@/config";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

export const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <header className="container flex max-w-3xl justify-between p-4">
      <div className="flex gap-2">
        <Link
          href={authenticatedNav[0]?.href ?? ""}
          className={pathname === "/dashboard" ? "font-bold" : ""}
        >
          {authenticatedNav[0]?.title}
        </Link>

        {authenticatedNav.slice(1).map((item) => (
          <Link
            key={`Nav-${item.title}`}
            href={item.href}
            className={pathname === item.href ? "font-bold" : ""}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <ClerkLoading>
          <Skeleton className="h-8 w-8 rounded-full lg:h-7 lg:w-7" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 lg:w-7 lg:h-7",
              },
            }}
          />
        </ClerkLoaded>
      </div>
    </header>
  );
};
