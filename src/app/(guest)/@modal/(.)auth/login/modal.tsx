"use client";

import ExpenseTrackerLogo from "@/components/logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { type FC } from "react";

interface ModalProps {
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ children }) => {
  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <Dialog onOpenChange={handleClose} open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <ExpenseTrackerLogo />
          <DialogTitle className="pt-2">Sign in to Dashboard 👋</DialogTitle>
          <DialogDescription>
            Welcome back! Please sign in to continue
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
