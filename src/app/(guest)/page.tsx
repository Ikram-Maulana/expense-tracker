import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { IconBrandGithub } from "@irsyadadl/paranoid";
import { type Metadata } from "next";
import Link from "next/link";
import { type FC } from "react";

export const metadata: Metadata = {
  title: "Homepage | Expense Tracker",
};

const HomePage: FC = async () => {
  const session = await auth();

  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl space-y-5 text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Track and manage your expenses with ease
        </h1>
        <p className="mx-auto max-w-xl leading-7">
          Expense tracker making it simple for you to track and manage your
          expenses. Easy to use and simple to understand.
        </p>

        <div className="flex items-center justify-center gap-x-3 text-sm font-medium">
          {session ? (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <a href="https://github.com/Ikram-Maulana/expense-tracker">
              <IconBrandGithub className="mr-2 h-4 w-4" />
              View Github Repository
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
