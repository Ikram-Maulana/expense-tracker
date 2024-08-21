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
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Error | Expense Tracker",
};

export default function AuthErrorPage() {
  return (
    <>
      <Card className="w-full border-0 shadow-none sm:w-96">
        <CardHeader className="pb-0">
          <ExpenseTrackerLogo />
          <CardTitle className="pt-4">Oops! Something went wrong</CardTitle>
          <CardDescription>
            An error occurred while processing your request. Please try again
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4 pt-2">
          <div className="flex w-full items-center justify-center">
            <ExclamationTriangleIcon className="text-destructive" />
          </div>
        </CardContent>
      </Card>

      <div className="flex w-fit justify-center">
        <Button variant="ghost" asChild>
          <a href="/auth/login">
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Login Page
          </a>
        </Button>
      </div>
    </>
  );
}
