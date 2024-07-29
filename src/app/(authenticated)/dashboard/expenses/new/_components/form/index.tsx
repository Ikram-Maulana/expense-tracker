"use client";

import { newExpense } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatAmount, isValidPrecisionAndScale } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@irsyadadl/paranoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
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

export const NewExpenseForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "0",
    },
  });
  const utils = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: newExpense,
    onSuccess: async () => {
      form.reset();
      await utils.invalidateQueries();
      router.push("/dashboard/expenses");
    },
    onError: (error) => {
      console.error(error instanceof Error ? error.message : error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) return;

    try {
      mutate(values);
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Expense Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <IconLoader className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};
