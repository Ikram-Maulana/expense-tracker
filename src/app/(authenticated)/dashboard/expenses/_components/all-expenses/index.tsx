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

  return data.map((expense) => (
    <TableRow key={expense.id}>
      <TableCell className="font-medium">{expense.id}</TableCell>
      <TableCell>{expense.name}</TableCell>
      <TableCell className="text-right">{expense.amount}</TableCell>
    </TableRow>
  ));
};
