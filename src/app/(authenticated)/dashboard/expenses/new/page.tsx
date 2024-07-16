import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type FC } from "react";
import { NewExpenseForm } from "./_components/form";
import { Card, CardContent } from "@/components/ui/card";

const AddExpensePage: FC = () => {
  return (
    <div className="mx-auto mt-4 max-w-3xl px-4">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          New Expense
        </h1>

        <Button asChild>
          <Link href="/dashboard/expenses">Go Back</Link>
        </Button>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-3">
          <NewExpenseForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpensePage;
