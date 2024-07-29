/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { auth } from "@/hono/auth";
import { formatAmount, isValidPrecisionAndScale } from "@/lib/utils";
import { db } from "@/server/db";
import { expenses as expensesTable } from "@/server/db/schema";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, sql, sum } from "drizzle-orm";
import { Hono } from "hono";
import * as z from "zod";

const h = new Hono();

const expenseSchema = z.object({
  id: z.number(),
  title: z.string(),
  amount: z.string(),
});
export const createExpenseSchema = expenseSchema.omit({ id: true }).extend({
  amount: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v), { message: "Amount must be a number" })
    .refine((v) => v >= 0, {
      message: "Amount must be greater than or equal to 0",
    })
    .refine((v) => isValidPrecisionAndScale(v), {
      message:
        "Amount must have a precision of 12 or less and scale of 2 or less",
    })
    .transform((v) => formatAmount(v)),
});

export const expensesRouter = h
  .use(auth)
  .get("/", async (c) => {
    const user = c.var.user;

    const expensesPrepared = db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(100)
      .orderBy(desc(expensesTable.createdAt))
      .prepare();
    const expenses = await expensesPrepared.all();

    return c.json({
      expenses,
    });
  })
  .get("/total-spent", async (c) => {
    const user = c.var.user;

    const totalSpentPrepare = db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, sql.placeholder("userId")))
      .limit(1)
      .prepare();
    const result = await totalSpentPrepare.all({ userId: user.id });
    const total = Number(result[0]?.total) ?? 0;
    const formattedTotal = formatAmount(total);

    return c.json({
      total: formattedTotal,
    });
  })
  .get("/:id{[0-9a-z-]+}", async (c) => {
    const id = c.req.param("id");
    const user = c.var.user;

    const expensePrepared = db
      .select()
      .from(expensesTable)
      .where(
        and(
          eq(expensesTable.id, sql.placeholder("id")),
          eq(expensesTable.userId, sql.placeholder("userId")),
        ),
      )
      .prepare();
    const expense = await expensePrepared
      .all({ id, userId: user.id })
      .then((r) => r[0]);

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
    async (c) => {
      const expense = c.req.valid("json");
      const user = c.var.user;

      const newExpensePrepare = db
        .insert(expensesTable)
        .values({
          ...expense,
          userId: sql.placeholder("userId"),
        })
        .returning()
        .prepare();
      const newExpense = await newExpensePrepare.all({ userId: user.id });

      return c.json(
        {
          expense: newExpense,
        },
        201,
      );
    },
  )
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user;

    const deleteExpensePrepare = db
      .delete(expensesTable)
      .where(
        and(
          eq(expensesTable.id, sql.placeholder("id")),
          eq(expensesTable.userId, sql.placeholder("userId")),
        ),
      )
      .returning()
      .prepare();
    const deletedExpense = await deleteExpensePrepare
      .all({ id, userId: user.id })
      .then((r) => r[0]);

    if (!deletedExpense) {
      return c.notFound();
    }

    return c.json({
      expense: deletedExpense,
    });
  });
