import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const styleRouter = router({
  getOne: publicProcedure.query(({ ctx,  }) => {
    return ctx.prisma.style.findUnique({
      where: {
        id: 1,
      },
    });
  }),
  updateOne: publicProcedure.input(z.object({
    rawcss: z.string(),
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.style.update({
      where: {
        id: 1,
      },
      data: {
        rawcss: input.rawcss,
      },
    });
  } ),
});
