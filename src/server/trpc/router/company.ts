import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const companyRouter = router({
  getOne: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.business.findUnique({
      where: {
        id: input ?? 1,
      },
    });
  }),
});
