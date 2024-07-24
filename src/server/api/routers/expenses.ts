/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Hono } from "hono";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { auth } from "@/hono/auth";

const h = new Hono();

const expenseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.number().int().positive(),
});
type Expense = z.infer<typeof expenseSchema>;
export const createExpenseSchema = expenseSchema.omit({ id: true });

let fakeExpenses: Expense[] = [
  { id: 1, name: "Rent", amount: 1000 },
  { id: 2, name: "Groceries", amount: 200 },
  { id: 3, name: "Utilities", amount: 150 },
];

export const expensesRouter = h
  .use(auth)
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .get("/total-spent", async (c) => {
    const total = fakeExpenses.reduce((acc, e) => acc + e.amount, 0);
    return c.json({
      total,
    });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .post(
    "/",
    zValidator("json", createExpenseSchema, (result, c) => {
      if (!result.success) {
        return c.json({ message: "Invalid input" }, 400);
      }
    }),
    (c) => {
      const expense = c.req.valid("json");
      const id = fakeExpenses.length + 1;
      const newExpense = { ...expense, id };
      fakeExpenses = [...fakeExpenses, newExpense];
      return c.json({
        message: "Expense created",
        expense: newExpense,
      });
    },
  )
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.findIndex((e) => e.id === id);
    if (expense === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(expense, 1)[0];
    return c.json({
      message: "Expense deleted",
      expense: deletedExpense,
    });
  });
