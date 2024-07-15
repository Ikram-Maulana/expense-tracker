import { getAllExpenses } from "@/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { AllExpenses } from "./_components/all-expenses";
import AllExpensesSkeleton from "./_components/all-expenses/skeleton";

export const runtime = "edge";

export default function ExpensesPage() {
  const queryClient = new QueryClient();

  void queryClient.prefetchQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto mt-4 max-w-3xl px-4">
        <Table>
          <TableCaption>A list of all your expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense fallback={<AllExpensesSkeleton />}>
              <AllExpenses />
            </Suspense>
          </TableBody>
        </Table>
      </div>
    </HydrationBoundary>
  );
}
