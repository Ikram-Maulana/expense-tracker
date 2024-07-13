import { getTotalSpent } from "@/actions/expenses";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { TotalSpent } from "./_components/total-spent";

export const runtime = "edge";

export default function HomePage() {
  const queryClient = new QueryClient();

  void queryClient.prefetchQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <h1>Total Spent</h1>
        <p>The total amount you&apos;ve spent</p>
        <div>
          <Suspense fallback={<p>Total Spent ...</p>}>
            <TotalSpent />
          </Suspense>
        </div>
      </main>
    </HydrationBoundary>
  );
}
