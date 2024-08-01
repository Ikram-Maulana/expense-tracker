"use client";

import { getTotalSpent } from "@/actions/expenses";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type FC } from "react";

export const TotalSpent: FC = () => {
  const { data, error } = useSuspenseQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) {
    throw error;
  }

  return `$${data.total}`;
};
