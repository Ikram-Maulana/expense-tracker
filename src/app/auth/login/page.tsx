import { LoginForm } from "@/components/login-form";
import ExpenseTrackerLogo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconArrowLeft } from "@irsyadadl/paranoid";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Expense Tracker",
};

export default function AuthLoginPage() {
  return (
    <>
      <Card className="w-full border-0 shadow-none sm:w-96">
        <CardHeader className="pb-0">
          <ExpenseTrackerLogo />
          <CardTitle className="pt-4">Sign in to Dashboard 👋</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4 pt-2">
          <LoginForm />
        </CardContent>
      </Card>

      <div className="flex w-fit justify-center">
        <Button variant="ghost" asChild>
          <Link href="/">
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Go to Homepage
          </Link>
        </Button>
      </div>
    </>
  );
}
