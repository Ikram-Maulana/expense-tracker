import { images } from "@/assets/images";
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
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Expense Tracker",
};

export default function AuthLoginPage() {
  return (
    <main className="h-full lg:mx-auto lg:max-w-screen-2xl lg:px-0">
      <div className="grid h-full grid-cols-2">
        <div className="container col-span-2 flex h-full flex-col items-center justify-center lg:col-span-1">
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
