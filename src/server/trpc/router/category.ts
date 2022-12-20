import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const categoryRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.productCategory.findMany();
  }),
  create: publicProcedure.input(z.object({
    categoryName: z.string(),
    categoryDescription: z.string(),
    categoryStatus: z.number(),
    categoryImage: z.string().nullish()
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.productCategory.create({
      data: {
        productCategoryName: input.categoryName,
        productCategoryDesc: input.categoryDescription,
        productCategoryStat: input.categoryStatus,
        productCategoryImg: input.categoryImage??"/img/placeholders/592x592.png",
      }
    });
  }),
  update: publicProcedure.input(z.object({
    id: z.number(),
    categoryName: z.string(),
    categoryDescription: z.string(),
    categoryStatus: z.number(),
    categoryImage: z.string().nullish()
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.productCategory.update({
      where: {
        id: input.id,
      },
      data: {
        productCategoryName: input.categoryName,
        productCategoryDesc: input.categoryDescription,
        productCategoryStat: input.categoryStatus,
        productCategoryImg: input.categoryImage??"/img/placeholders/592x592.png",
      }
    });
  }),
  getOne: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.productCategory.findUnique({
      where: {
        id: input,
      },
    });
  } ),
});