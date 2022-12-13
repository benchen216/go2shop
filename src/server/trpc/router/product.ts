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
      console.log(input?.cursor);
      if (input?.cursor===undefined) {
        console.log("no cursor");
        return ctx.prisma.product.findMany({
          take: input?.limit ?? 6,
          where: {
            productName: {
              contains: input?.keyword ?? "test",
            }
          },
        });
      }else {
        console.log("cursor");
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
  create: publicProcedure.input(z.object({
    productName:z.string(),
    productPrice:z.number(),
    productImage:z.string(),
    productCreatedBy:z.number(),
    productCategory:z.number(),
    productUpdatedBy:z.number().nullish(),
    productDeletedBy:z.number().nullish(),
    productSuggestPrice:z.number().nullish()
  })).mutation(
    async ({ ctx, input }) => {
    const product = await ctx.prisma.product.create({
      data: {
        ...input,
        productStatus:1
      },
    });
    return "product";

  }),
  update: publicProcedure.input(z.object({
    id: z.number(),
    productName: z.string(),
    productDescription: z.string(),
    productPrice: z.number(),
    productImage: z.string(),
    productCategory: z.number(),
    productStock: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.update({
      where: {
        id: input.id,
      },
      data: input,
    });
    return product;
  }),
  delete : publicProcedure.input(z.object({
    id: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.update({
      where: {
        id: input.id,
      },
      data: {
        productStatus:0
      },
    });
    return product;
  }),
});
