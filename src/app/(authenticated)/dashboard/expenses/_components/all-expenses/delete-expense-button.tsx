import { deleteExpense } from "@/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

    mutate(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          <IconTrash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Data will be permanently deleted from
            the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" asChild>
            <AlertDialogAction
              onClick={() => handleDelete(id)}
              disabled={isPending}
            >
              Delete
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
