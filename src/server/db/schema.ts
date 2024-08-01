// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { formatAmount, isValidPrecisionAndScale } from "@/lib/utils";
import { sql } from "drizzle-orm";
import {
  index,
  int,
  integer,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { AdapterAccountType } from "next-auth/adapters";
import { v7 as uuidv7 } from "uuid";
import * as z from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `expense-tracker_${name}`,
);

export const expenses = createTable(
  "expenses",
  {
    id: text("id").notNull().primaryKey().$defaultFn(uuidv7),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: text("amount").notNull(),
    date: text("date").notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (expenses) => ({
    userIdIndex: index("user_id_idx").on(expenses.userId),
  }),
);
export const insertExpenseSchema = createInsertSchema(expenses, {
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  amount: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v), { message: "Amount must be a number" })
    .refine((v) => v >= 0, {
      message: "Amount must be greater than or equal to 0",
    })
    .refine((v) => isValidPrecisionAndScale(v), {
      message: "Amount must be a valid monetary value",
    })
    .transform((v) => formatAmount(v)),
  date: z
    .string()
    .refine((v) => !isNaN(Date.parse(v)), { message: "Invalid date format" }),
});
export const selectExpenseSchema = createSelectSchema(expenses);

export const users = createTable("user", {
  id: text("id").primaryKey().$defaultFn(uuidv7),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);
