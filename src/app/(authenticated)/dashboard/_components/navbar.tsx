import { auth } from "@/lib/auth";
import { type FC } from "react";
import { NavItem } from "./nav-item";
import { UserButton } from "./user-button";

export const Navbar: FC = async () => {
  const session = await auth();

  return (
    <header className="container flex max-w-3xl justify-between p-4">
      <div className="flex gap-2">
        <NavItem />
      </div>

      <div className="flex items-center justify-center">
        <UserButton session={session} />
      </div>
    </header>
  );
};
