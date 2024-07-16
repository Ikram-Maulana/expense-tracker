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
import { Suspense } from "react";
import { TotalSpent } from "./_components/total-spent";

export default function HomePage() {
  const queryClient = new QueryClient();

  void queryClient.prefetchQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Card className="mx-auto mt-4 w-[350px]">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you&apos;ve spent</CardDescription>
        </CardHeader>
        <CardContent aria-live="polite">
          <Suspense fallback={"..."}>
            <TotalSpent />
          </Suspense>
        </CardContent>
      </Card>
    </HydrationBoundary>
  );
}
