import { router, publicProcedure } from "../trpc";

export const reportRouter = router({
  getReport: publicProcedure.query(({ ctx,  }) => {
    return ctx.prisma.saleReport.groupBy({
      by: ['productId'],
      _sum: {
        total: true,
        quantity: true,
      },
    });
  }),
  getCategoryReport: publicProcedure.query(({ ctx,  }) => {
    return ctx.prisma.saleReport.groupBy({
      by: ['categoryId'],
      _sum: {
        total: true,
        quantity: true,
      },
    });
  }),
});
