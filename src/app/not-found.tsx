import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@irsyadadl/paranoid";
import { type Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Page Not Found | Expense Tracker",
};

export default function NotFound() {
  return (
    <div className="container flex h-full w-full flex-col items-center justify-center text-left">
      <div className="w-full max-w-sm">
        <p className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          404
        </p>

        <h1 className="mt-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Page not found
        </h1>
        <p className="mb-6 mt-4 text-muted-foreground">
          The page you&apos;re looking for isn&apos;t found. We suggest you go
          back to Homepage.
        </p>

        <Button variant="ghost" asChild>
          <Link href="/">
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Go to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
