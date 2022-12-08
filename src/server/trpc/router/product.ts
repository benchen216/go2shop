import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany(
      {
        where: {
          id: 1,
        },
        select: {
          id: true,
          productName: true,
        },
      }
    );
  }),
  getOne: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.product.findUnique({
      where: {
        id: input ?? 1,
      },
    });
  }),
  getOnePage: publicProcedure.input(z.object(
    { cursor: z.number().nullish(),
      limit: z.number().nullish()}).nullish())
    .query(({ ctx, input }) => {
      if (input?.cursor === null) {
        return ctx.prisma.product.findMany({
          take: input?.limit ?? 6,
        });
      }else {
        return ctx.prisma.product.findMany({
          take: input?.limit ?? 6,
          skip: 1,
          cursor: {
            id: input?.cursor,
          },
        });
      }
  }),
  search: publicProcedure.input(z.object(
    { cursor: z.number().nullish(),keyword: z.string().nullish(),
      limit: z.number().nullish()}).nullish())
    .query(({ ctx, input }) => {
      if (input?.cursor) {
        return ctx.prisma.product.findMany({
          take: input?.limit ?? 6,
          where: {
            productName: {
              contains: input?.keyword ?? "test",
            }
          },
        });
      }else {
        return ctx.prisma.product.findMany({
          take: input?.limit ?? 6,
          skip: 1,
          cursor: {
            id: input?.cursor ?? 1,
          },
          where: {
            productName: {
              contains: input?.keyword ?? "test",
            }
          },
        });
      }
    }),
});