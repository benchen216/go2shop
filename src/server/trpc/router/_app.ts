import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { productRouter } from "./product";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
