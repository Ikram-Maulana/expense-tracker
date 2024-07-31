import { deleteExpense } from "@/actions";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@irsyadadl/paranoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const deleteExpenseKey = ["delete-expense"];
export const DeleteExpenseButton = async ({ id }: { id: string }) => {
  const utils = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: deleteExpenseKey,
    mutationFn: deleteExpense,
    onSuccess: async () => {
      await utils.invalidateQueries();
      toast.success("Expense deleted successfully!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Internal Server Error",
      );
    },
  });

  const handleDelete = (id: string) => {
    if (isPending) return;

    try {
      mutate(id);
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => handleDelete(id)}
      disabled={isPending}
    >
      {isPending ? "..." : <IconTrash className="h-4 w-4" />}
    </Button>
  );
};
