import { api } from "@/server/api/hono";

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
