"use client";

import { getAllExpenses } from "@/actions";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatToLocaleDate } from "@/lib/utils";
import { type expenses } from "@/server/db/schema";
import {
  useIsMutating,
  useMutationState,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { type InferSelectModel } from "drizzle-orm";
import { type FC } from "react";
import { newExpenseKey } from "../../new/_components/form";

type ExpensePendingProps = InferSelectModel<typeof expenses>;

export const AllExpenses: FC = () => {
  const { data, error } = useSuspenseQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  const isMutatingExpense = useIsMutating({
    mutationKey: newExpenseKey,
  });
  const expensePendingData = useMutationState({
    filters: { mutationKey: newExpenseKey, status: "pending" },
    select: (mutation) => mutation.state.variables as ExpensePendingProps,
  });

  if (error) {
    throw error;
  }

  return (
    <>
      {isMutatingExpense && expensePendingData
        ? expensePendingData.map((expense, idx) => (
            <TableRow key={`expense-pending-${idx}`} className="animate-pulse">
              <TableCell>{expense.title}</TableCell>
              <TableCell className="text-right">{expense.amount}</TableCell>
              <TableCell className="text-right">
                {formatToLocaleDate(new Date(expense.date), "YYYY-MM-DD")}
              </TableCell>
            </TableRow>
          ))
        : null}
      {data.map((expense, idx) => (
        <TableRow key={`expense-${idx}`}>
          <TableCell>{expense.title}</TableCell>
          <TableCell className="text-right">{expense.amount}</TableCell>
          <TableCell className="text-right">
            {formatToLocaleDate(new Date(expense.date), "YYYY-MM-DD")}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
