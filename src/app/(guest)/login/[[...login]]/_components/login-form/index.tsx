"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { IconBrandGithub, IconLoader } from "@irsyadadl/paranoid";
import { useEffect, useState, type FC } from "react";
import { LoginFormSkeleton } from "./skeleton";

export const LoginForm: FC = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <LoginFormSkeleton />;
  }

  return (
    <SignIn.Root>
      <Clerk.Loading>
        {(globalLoading: boolean) => (
          <SignIn.Step name="start">
            <Card className="w-full sm:w-96">
              <CardHeader className="pb-0">
                <CardTitle>Sign in to Dashboard 👋</CardTitle>
                <CardDescription>
                  Welcome back! Please sign in to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-y-4 pt-2">
                <Clerk.GlobalError className="mt-3 block text-left text-sm text-red-400" />
                <div className="grid gap-x-4">
                  <Clerk.Connection name="github" asChild>
                    <Button
                      size="sm"
                      type="button"
                      variant="outline"
                      disabled={globalLoading}
                    >
                      <Clerk.Loading scope="provider:github">
                        {(isLoading: boolean) =>
                          isLoading ? (
                            <IconLoader className="mr-2 h-3 w-3 animate-spin" />
                          ) : (
                            <IconBrandGithub className="mr-2 h-4 w-4" />
                          )
                        }
                      </Clerk.Loading>
                      Sign in with Github
                    </Button>
                  </Clerk.Connection>
                </div>
              </CardContent>
            </Card>
          </SignIn.Step>
        )}
      </Clerk.Loading>
    </SignIn.Root>
  );
};
