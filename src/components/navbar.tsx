"use client";

import { nav } from "@/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

export const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <header className="flex gap-2 p-2">
      <Link
        href={nav[0]?.href ?? ""}
        className={pathname === "/" ? "font-bold" : ""}
      >
        {nav[0]?.title}
      </Link>

      {nav.slice(1).map((item) => (
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
