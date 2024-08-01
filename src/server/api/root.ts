import { expensesRouter } from "@/server/api/routers/expenses";
import { Hono } from "hono";

const h = new Hono();

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = h.route("/expenses", expensesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
