"use client";

import { getAllExpenses } from "@/actions";
import { TableCell, TableRow } from "@/components/ui/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type FC } from "react";

export const AllExpenses: FC = () => {
  const { data, error } = useSuspenseQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (error) {
    throw error;
  }

  return data.map((expense, idx) => (
    <TableRow key={expense.id}>
      <TableCell className="font-medium">{idx + 1}</TableCell>
      <TableCell>{expense.title}</TableCell>
      <TableCell className="text-right">{expense.amount}</TableCell>
    </TableRow>
  ));
};
