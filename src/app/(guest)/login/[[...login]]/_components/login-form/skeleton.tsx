import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type FC } from "react";

export const LoginFormSkeleton: FC = () => {
  return (
    <Card className="w-full sm:w-96">
      <CardHeader className="pb-0">
        <CardTitle>Sign in to Dashboard 👋</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-y-4 pt-2">
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
};
