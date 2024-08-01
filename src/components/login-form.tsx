"use client";

import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconLoader } from "@irsyadadl/paranoid";
import { signIn } from "next-auth/react";
import { useState, type FC } from "react";
import { toast } from "sonner";

export const LoginForm: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("github", {
        redirectTo: "/dashboard",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Internal server error",
      );
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={handleSignIn}
      disabled={loading}
    >
      {loading ? (
        <IconLoader className="mr-2 h-3 w-3 animate-spin" />
      ) : (
        <IconBrandGithub className="mr-2 h-4 w-4" />
      )}
      Sign in with Github
    </Button>
  );
};
