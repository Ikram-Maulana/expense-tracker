import { auth } from "@/lib/auth";
import { createFactory } from "hono/factory";
import { type User } from "next-auth";

type Env = {
  Variables: {
    user: User;
  };
};

const factory = createFactory<Env>();

export const honoAuth = factory.createMiddleware(async (c, next) => {
  const session = await auth();

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user!);
  await next();
});
