import { images } from "@/assets/images";
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
import Image from "next/image";

export const metadata: Metadata = {
  title: "Auth Error | Expense Tracker",
};

export default function AuthErrorPage() {
  return (
    <main className="h-full lg:mx-auto lg:max-w-screen-2xl lg:px-0">
      <div className="grid h-full grid-cols-2">
        <div className="container col-span-2 flex h-full flex-col items-center justify-center lg:col-span-1">
          <Card className="w-full border-0 shadow-none sm:w-96">
            <CardHeader className="pb-0">
              <ExpenseTrackerLogo />
              <CardTitle className="pt-4">Oops! Something went wrong</CardTitle>
              <CardDescription>
                An error occurred while processing your request. Please try
                again
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
        </div>

        <div className="relative hidden h-full overflow-hidden lg:block">
          <Image
            src={images.streetImage}
            alt="A man riding a motorcycle down a street next to tall buildings"
            className="h-full w-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>
    </main>
  );
}
