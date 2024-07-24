import { currentUser, type User } from "@clerk/nextjs/server";
import { createFactory } from "hono/factory";

type Env = {
  Variables: {
    user: User;
  };
};

const factory = createFactory<Env>();

export const auth = factory.createMiddleware(async (c, next) => {
  const user = await currentUser();

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", user);
  await next();
});
