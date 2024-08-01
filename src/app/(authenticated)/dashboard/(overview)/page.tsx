import { getTotalSpent } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { type Metadata } from "next";
import { Suspense } from "react";
import { TotalSpent } from "./_components/total-spent";

export const metadata: Metadata = {
  title: "Overview | Expense Tracker",
};

export default function OverviewPage() {
  const queryClient = new QueryClient();

  void queryClient.prefetchQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  return (
    <Card className="mx-auto mt-4 w-[350px]">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you&apos;ve spent</CardDescription>
      </CardHeader>
      <CardContent aria-live="polite">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={"..."}>
            <TotalSpent />
          </Suspense>
        </HydrationBoundary>
      </CardContent>
    </Card>
  );
}
