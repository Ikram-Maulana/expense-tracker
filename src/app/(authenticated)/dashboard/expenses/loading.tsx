import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { type FC } from "react";

const Loading: FC = () => {
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

      <Skeleton className="mx-auto mt-6 h-[150.5px] w-full max-w-3xl px-4" />
      <Skeleton className="mx-auto mt-4 h-[20px] w-[159.39px]" />
    </div>
  );
};

export default Loading;
