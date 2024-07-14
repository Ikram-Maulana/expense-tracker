import { nav } from "@/config";
import Link from "next/link";
import { type FC } from "react";

export const Navbar: FC = () => {
  return (
    <header className="flex gap-2 p-2">
      {nav.map((item) => (
        <Link key={`Nav-${item.title}`} href={item.href}>
          {item.title}
        </Link>
      ))}
    </header>
  );
};
