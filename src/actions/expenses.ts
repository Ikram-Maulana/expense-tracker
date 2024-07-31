import { api } from "@/server/api/hono";
import { type createExpenseSchema } from "@/types";
import type * as z from "zod";

export const getAllExpenses = async () => {
  const response = await api.expenses.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  const data = await response.json();
  return data.expenses;
};

export const getTotalSpent = async () => {
  const response = await api.expenses["total-spent"].$get();
  if (!response.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await response.json();
  return data;
};

type NewExpenseProps = z.infer<typeof createExpenseSchema>;
export const newExpense = async (expense: NewExpenseProps) => {
  const response = await api.expenses.$post({ json: expense });
  if (!response.ok) {
    throw new Error("Failed to create expense");
  }
  const data = await response.json();
  return data.expense;
};

export const deleteExpense = async (id: string) => {
  const response = await api.expenses[":id{[0-9a-z-]+}"].$delete({
    param: { id },
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
  const data = await response.json();
  return data;
};
