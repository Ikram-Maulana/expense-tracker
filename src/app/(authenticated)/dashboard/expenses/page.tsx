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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExpensesPage() {
  const queryClient = new QueryClient();

  void queryClient.prefetchQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  return (
    <div className="mx-auto mt-4 max-w-3xl px-4">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          All Expenses
        </h1>

        <Button className="bg-green-500 text-white hover:bg-green-600" asChild>
          <Link href="/dashboard/expenses/new">Add Expense</Link>
        </Button>
      </div>

      <Table className="mt-6">
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AllExpensesSkeleton />}>
              <AllExpenses />
            </Suspense>
          </HydrationBoundary>
        </TableBody>
      </Table>
    </div>
  );
}
