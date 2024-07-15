"use client";

import { authenticatedNav } from "@/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

export const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <header className="flex gap-2 p-2">
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
    </header>
  );
};
