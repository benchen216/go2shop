import { z } from "zod";

import { router, publicProcedure,protectedProcedure } from "../trpc";

export const userRouter = router({
  userDetail: protectedProcedure.query(({ ctx }) => {
    console.log(ctx.session.user);
    return ctx.prisma.user.findUnique({
      where: {
        id: Number(ctx.session.user.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        userPhone: true,
        userAddress: true
      }
    });
  }),
  userDetails: protectedProcedure.input(
    z.object({
      name: z.string(),
    }),
  )
    .mutation(async ({ctx, input }) => {
      const post = await ctx.prisma.user.update({
        where: {
          id: Number(ctx.session.user.id),
        },
        data: {
          name: input.name,
        },
        //select: ,
      });
      return "success";
    }),
  updateData: protectedProcedure
    .input(z.object({
      name: z.string().nullish(),
      image: z.string().nullish(),
      userPhone: z.string().nullish(),
      userAddress: z.string().nullish(),
    }))
    .mutation(async ({ ctx ,input}) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: Number(ctx.session.user.id),
        },
        data: {
          name: input.name||undefined,
          userPhone: input.userPhone||undefined,
          userAddress: input.userAddress||undefined,
        }
      });
      return user;
    }),
});
