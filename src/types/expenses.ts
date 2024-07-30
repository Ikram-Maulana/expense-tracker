import { formatAmount, isValidPrecisionAndScale } from "@/lib/utils";
import * as z from "zod";

export const expenseSchema = z.object({
  id: z.number(),
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
      message:
        "Amount must have a precision of 12 or less and scale of 2 or less",
    })
    .transform((v) => formatAmount(v)),
});
export const createExpenseSchema = expenseSchema.omit({ id: true });
