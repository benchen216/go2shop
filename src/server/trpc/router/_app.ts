import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { productRouter } from "./product";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  product: productRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
